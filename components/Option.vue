<template>
  <div
    v-if="option"
    class="w-full h-auto max-h-40 p-2 bg-disabled text-secondary flex flex-col items-center justify-center hover:bg-primary hover:text-white"
    @click="selectedHandler"
  >
    <h2 class="text-xl">{{ option }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

enum OptionEvents {
  Selected = 'selected'
}

export default defineComponent({
  props: {
    option: {
      type: String,
      default: ''
    }
  },
  emits: {
    [OptionEvents.Selected]: null
  },
  setup(_, { emit }) {
    const selectedHandler = () => {
      emit(OptionEvents.Selected)
    }

    return { selectedHandler }
  }
})
</script>

<style></style>
