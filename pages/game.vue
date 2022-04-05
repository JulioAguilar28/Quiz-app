<template>
  <div>
    <GameController />
    <ModalsContainer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import { ModalsContainer } from 'vue-final-modal'
import GameController from '@/components/GameController.vue'

export default Vue.extend({
  components: { GameController, ModalsContainer },
  layout: 'main'
})
</script>
