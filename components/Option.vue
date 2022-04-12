<template>
  <div
    v-if="option"
    class="w-full xl:w-auto xl:max-w-full h-auto xl:h-16 max-h-40 xl:max-h-36 p-2 flex flex-col items-center justify-center xl:hover:bg-primary xl:hover:text-white xl:cursor-pointer"
    :class="state.classes"
    @click="selectedHandler"
  >
    <h2 class="text-xl">{{ option }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from '@nuxtjs/composition-api'

enum OptionEvents {
  Selected = 'selected'
}

interface OptionInterface {
  normalClasses: string
  selectedClasses: string
  correctClasses: string
  wrongClasses: string
  classes: string
}

export default defineComponent({
  props: {
    option: {
      type: String,
      default: ''
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    isCorrect: {
      type: Boolean,
      default: false
    },
    showCorrectAnswer: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    [OptionEvents.Selected]: null
  },
  setup(props, { emit }) {
    const state: OptionInterface = reactive({
      normalClasses: 'bg-disabled text-secondary',
      selectedClasses: 'bg-primary text-white',
      correctClasses: 'bg-emerald-300 text-white',
      wrongClasses: 'bg-red-500 text-white',
      classes: computed(() => {
        if (props.isSelected && props.showCorrectAnswer && props.isCorrect)
          return state.correctClasses

        if (props.isSelected && props.showCorrectAnswer && !props.isCorrect)
          return state.wrongClasses

        if (props.showCorrectAnswer) {
          return props.isCorrect ? state.correctClasses : state.wrongClasses
        }

        if (props.isSelected) return state.selectedClasses

        return state.normalClasses
      })
    })

    const selectedHandler = () => {
      emit(OptionEvents.Selected)
    }

    return { state, selectedHandler }
  }
})
</script>

<style></style>
