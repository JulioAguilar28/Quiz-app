<template>
  <section
    class="w-full xl:w-2/3 h-52 bg-primary flex flex-col justify-center items-center xl:self-center px-7 mb-9"
  >
    <h2 class="text-2xl text-white text-center">{{ question }}</h2>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    question: {
      type: String,
      default: ''
    }
  },
  setup() {}
})
</script>

<style></style>
