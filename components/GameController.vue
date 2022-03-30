<template>
  <div v-if="!state.loading" class="h-full flex flex-col">
    <h2 class="text-xl text-center text-secondary my-4">
      Question number: {{ state.currentQuestionIndex + 1 }}
    </h2>
    <h2 class="text-xl text-center text-secondary my-4">Score: {{ state.totalScore }}</h2>
    <QuestionView :question="state.currentQuestionText" />
    <div class="px-4 h-auto flex flex-col gap-y-4">
      <Option
        v-for="(value, key) in state.currentPossibleAnswers"
        :key="key"
        :option="value"
        :is-selected="state.userSelectedAnswer === key"
        :is-correct="state.currentCorrectAnswer === key"
        :show-correct-answer="state.showCurrentCorrectAnswer"
        @selected="selectOptionHandler(key)"
      />
    </div>
    <GameControlsController
      v-if="state.initTimer"
      :enable-next-button="state.userSelectedAnswer !== undefined"
      @next="nextQuestionHandler"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, computed } from '@nuxtjs/composition-api'
import QuestionView from './QuestionView.vue'
import Option from './Option.vue'
import GameControlsController from './GameControlsController.vue'
import * as QuizService from '@/services/QuizService'
import type { Question } from '@/models/Question'
import type { PossibleAnswers } from '@/models/AppModels'
import ComponentContext, { buildComponentContext } from '@/utils/ComponentContext'

interface GameControllerState {
  questions?: Array<Question>
  totalQuestions: number
  currentQuestionIndex: number
  currentQuestion?: Question
  loading: boolean
  currentQuestionText?: string
  currentPossibleAnswers?: PossibleAnswers
  currentCorrectAnswer?: string
  userSelectedAnswer?: string
  showCurrentCorrectAnswer: boolean
  isCurrentSelectedAnswerCorrect: boolean
  initTimer: boolean
  totalScore: number
}

export default defineComponent({
  components: { Option, QuestionView, GameControlsController },
  setup(_props, setupContext) {
    const context: ComponentContext = buildComponentContext(setupContext)

    const state: GameControllerState = reactive({
      questions: undefined,
      totalQuestions: computed(() => state.questions!.length),
      currentQuestionIndex: 0,
      currentQuestion: computed(() => state.questions?.at(state.currentQuestionIndex)),
      currentQuestionText: computed(() => state.currentQuestion?.question),
      currentPossibleAnswers: computed(() => state.currentQuestion?.possibleAnswers),
      currentCorrectAnswer: computed(() => state.currentQuestion?.correctAnswer),
      userSelectedAnswer: undefined,
      showCurrentCorrectAnswer: false,
      isCurrentSelectedAnswerCorrect: computed(
        () => state.userSelectedAnswer === state.currentCorrectAnswer
      ),
      initTimer: false,
      totalScore: 0,
      loading: false
    })

    onMounted(() => {
      getQuizByCategory(state, context)
    })

    const selectOptionHandler = (optionKey: string) => {
      state.userSelectedAnswer = optionKey
    }

    const nextQuestionHandler = (score: number) => {
      nextQuestion(state, context, score)
    }

    return {
      state,
      selectOptionHandler,
      nextQuestionHandler
    }
  }
})

const getQuizByCategory = async (state: GameControllerState, _context: ComponentContext) => {
  try {
    state.loading = true
    state.questions = await QuizService.getQuizByCategory('code')
    state.initTimer = true
    state.loading = false
  } catch (_error) {}
}

const nextQuestion = (state: GameControllerState, _context: ComponentContext, score: number) => {
  state.initTimer = false
  state.showCurrentCorrectAnswer = true
  if (state.isCurrentSelectedAnswerCorrect || score === 0) state.totalScore += score

  if (state.currentQuestionIndex < state.totalQuestions) {
    setTimeout(() => {
      state.userSelectedAnswer = undefined
      state.showCurrentCorrectAnswer = false
      ++state.currentQuestionIndex
      state.initTimer = true
    }, 2000)
  }
}
</script>

<style></style>
