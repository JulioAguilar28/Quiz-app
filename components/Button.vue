<template>
  <button class="w-28 h-16 shadow-lg shadow-primary" :class="state.classes" @click="clickHandler">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from '@nuxtjs/composition-api'

enum ButtonVariants {
  Primary = 'primary',
  Secondary = 'secondary'
}

enum ButtonEvents {
  Click = 'click'
}

interface ButtonState {
  primaryClasses: Array<String>
  secondaryClasses: Array<String>
  classes: Array<String>
}

export default defineComponent({
  props: {
    variant: {
      type: String,
      default: ButtonVariants.Primary
    }
  },
  emits: {
    [ButtonEvents.Click]: null
  },
  setup(props, { emit }) {
    const state: ButtonState = reactive({
      primaryClasses: computed(() => ['text-white', 'bg-primary']),
      secondaryClasses: computed(() => ['text-primary', 'bg-white', 'border', 'border-primary']),
      classes: computed(() =>
        props.variant === ButtonVariants.Primary ? state.primaryClasses : state.secondaryClasses
      )
    })

    const clickHandler = () => {
      emit(ButtonEvents.Click)
    }

    return {
      state,
      clickHandler
    }
  }
})
</script>
