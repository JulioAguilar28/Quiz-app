<template>
  <vue-final-modal
    v-model="state.show"
    classes="flex justify-center items-center px-2"
    content-class="bg-white w-full h-2/4 flex flex-col justify-evenly items-center"
  >
    <div class="bg-primary w-60 h-60 rounded-full text-center">
      <h2 class="text-2xl text-white my-8">Your score</h2>
      <span class="text-white text-8xl">{{ state.score }}</span>
    </div>
    <div class="self-end mr-4">
      <Button @click="continueHandler">Continue</Button>
    </div>
  </vue-final-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import Button from '@/components/Button.vue'

enum GameScoreModalEvents {
  Continue = 'continue'
}

export default defineComponent({
  components: { Button },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    score: {
      type: Number,
      default: 0
    }
  },
  emits: {
    [GameScoreModalEvents.Continue]: null
  },
  setup(props, { emit }) {
    const { show, score } = toRefs(props)

    const state = reactive({
      show,
      score
    })

    const continueHandler = () => {
      emit(GameScoreModalEvents.Continue)
    }

    return { state, continueHandler }
  }
})
</script>

<style></style>
