<template>
  <button
    class="w-24 h-10 hover:shadow-lg hover:shadow-primary"
    :class="state.classes"
    :disabled="disabled"
    @click="clickHandler"
  >
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
  primaryClasses: Array<string>
  secondaryClasses: Array<string>
  classes: Array<string>
  disabledClasses: Array<string>
}

export default defineComponent({
  props: {
    variant: {
      type: String,
      default: ButtonVariants.Primary
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    [ButtonEvents.Click]: null
  },
  setup(props, { emit }) {
    const state: ButtonState = reactive({
      primaryClasses: computed(() => ['text-white', 'bg-primary']),
      secondaryClasses: computed(() => ['text-primary', 'bg-white', 'border', 'border-primary']),
      disabledClasses: computed(() => ['text-white', 'bg-disabled']),
      classes: computed(() =>
        props.disabled
          ? state.disabledClasses
          : props.variant === ButtonVariants.Primary
          ? state.primaryClasses
          : state.secondaryClasses
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
