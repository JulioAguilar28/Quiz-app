<template>
  <div><GameController /></div>
</template>

<script lang="ts">
import Vue from 'vue'
import GameController from '@/components/GameController.vue'

export default Vue.extend({
  components: { GameController },
  layout: 'main'
})
</script>
