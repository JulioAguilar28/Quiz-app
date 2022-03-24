<template>
  <div>
    <label class="relative">
      <div class="absolute mt-2 ml-5">
        <span class="text-sm leading-5">{{ label }}</span>
      </div>
      <input
        class="w-full h-20 border border-secondary pl-5 pt-4 text-primary focus:outline-none focus:shadow-lg"
        type="text"
        @input="inputHandler"
      />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

enum InputEvents {
  Input = 'input'
}

export default defineComponent({
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  emits: {
    [InputEvents.Input]: null
  },
  setup(_, { emit }) {
    const inputHandler = (event: Event) => {
      const target = event.target as HTMLInputElement
      emit(InputEvents.Input, target.value)
    }

    return {
      inputHandler
    }
  }
})
</script>

<style></style>
