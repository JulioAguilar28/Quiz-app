<template>
  <div v-if="!state.loading" class="h-screen">
    <h2 class="text-xl text-center text-secondary my-4">
      Question number: {{ state.currentQuestionIndex + 1 }}
    </h2>
    <QuestionView :question="state.currentQuestionText" />
    <div class="px-4 h-auto flex flex-col gap-y-4">
      <Option
        v-for="(value, key) in state.currentPossibleAnswers"
        :key="key"
        :option="value"
        @selected="selectOptionHandler(key)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, computed } from '@nuxtjs/composition-api'
import QuestionView from './QuestionView.vue'
import Option from './Option.vue'
import * as QuizService from '@/services/QuizService'
import type { Question } from '@/models/Question'
import type { CorrectAnswers, PossibleAnswers } from '~/models/AppModels'

interface GameControllerState {
  questions?: Array<Question>
  totalQuestions: number
  currentQuestionIndex: number
  currentQuestion?: Question
  loading: boolean
  currentQuestionText?: string
  currentPossibleAnswers?: PossibleAnswers
  currentCorrectAnswer: string
  userSelectedAnswer?: string
  isCurrentSelectedAnswerCorrect: boolean
}

export default defineComponent({
  components: { Option, QuestionView },
  setup(_props, _context) {
    const state: GameControllerState = reactive({
      questions: undefined,
      totalQuestions: computed(() => state.questions!.length || 0),
      currentQuestionIndex: 0,
      currentQuestion: computed(() => state.questions?.at(state.currentQuestionIndex)),
      currentQuestionText: computed(() => state.currentQuestion?.question),
      currentPossibleAnswers: computed(() => state.currentQuestion?.possibleAnswers),
      currentCorrectAnswer: computed(() =>
        Object.entries(state.currentQuestion?.correctAnswers as CorrectAnswers)
          .find(([_key, value]) => value)!
          .at(0)
      ),
      userSelectedAnswer: undefined,
      isCurrentSelectedAnswerCorrect: computed(
        () => state.currentCorrectAnswer === state.userSelectedAnswer
      ),
      loading: false
    })

    onMounted(() => {
      getQuizByCategory(state)
    })

    const selectOptionHandler = (optionKey: string) => {
      state.userSelectedAnswer = optionKey
    }

    return {
      state,
      selectOptionHandler
    }
  }
})

const getQuizByCategory = async (state: GameControllerState) => {
  try {
    state.loading = true
    state.questions = await QuizService.getQuizByCategory('code')
    state.loading = false
  } catch (_error) {}
}
</script>

<style></style>
