<template>
  <vue-final-modal
    v-model="state.show"
    classes="flex justify-center items-center px-2"
    content-class="bg-white w-full md:w-2/3 h-2/4 flex flex-col justify-evenly md:justify-around items-center"
  >
    <div class="bg-primary w-60 md:w-72 md:h-72 h-60 rounded-full text-center">
      <h2 class="text-2xl md:text-3xl text-white my-8 md:my-12">Your score</h2>
      <span class="text-white text-8xl">{{ state.score }}</span>
    </div>
    <div class="self-end mr-4">
      <Button class="md:h-14" @click="continueHandler">Continue</Button>
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
