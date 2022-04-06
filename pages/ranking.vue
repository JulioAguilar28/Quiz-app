<template>
  <div class="flex flex-col h-screen">
    <header class="text-center py-2 border-b-2 shadow-md">
      <h1 class="text-3xl text-primary">Ranking</h1>
    </header>

    <RankingController />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import RankingController from '../components/RankingController.vue'

export default defineComponent({
  components: { RankingController }
})
</script>

<style></style>
