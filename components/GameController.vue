<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import * as QuizService from '@/services/QuizService'

export default defineComponent({
  setup() {
    onMounted(() => {
      QuizService.getQuizByCategory('Linux')
    })
  }
})
</script>

<style></style>
