<template>
  <div class="flex flex-grow justify-around items-end my-10">
    <div class="border-primary border-2 w-10 h-10 rounded-full flex items-center justify-center">
      {{ state.remainingTime }}
    </div>
    <Button :disabled="!enableNextButton" @click="nextHandler"
      ><span class="flex justify-center"
        >Next <img class="ml-2" src="~/assets/icons/next.svg" alt="next icon" /></span
    ></Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from '@nuxtjs/composition-api'
import Button from './Button.vue'
import ComponentContext, { buildComponentContext } from '@/utils/ComponentContext'

const ONE_SECOND = 1000

enum GameControlsControllerEvents {
  Next = 'next'
}

interface GameControlsControllerState {
  remainingTime: number
}

export default defineComponent({
  components: { Button },
  props: {
    enableNextButton: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    [GameControlsControllerEvents.Next]: null
  },
  setup(_, setupContext) {
    const context = buildComponentContext(setupContext)

    const state: GameControlsControllerState = reactive({
      remainingTime: 30
    })

    onMounted(() => {
      initTimer(state, context)
    })

    const nextHandler = () => {
      context.$emit(GameControlsControllerEvents.Next, state.remainingTime)
    }

    return { state, nextHandler }
  }
})

const initTimer = (state: GameControlsControllerState, _context: ComponentContext) => {
  const timerId = setInterval(() => {
    state.remainingTime--

    if (state.remainingTime === 0) {
      // emit(GameControlsControllerEvents.Next, 0)
      clearInterval(timerId)
    }
  }, ONE_SECOND)
}
</script>

<style></style>
