<template>
  <main>
    <section class="p-4">
      <h3 class="text-xl text-primary text-center pb-4">Welcome to the quiz app</h3>
      <h4 class="text-xl text-secondary">Instructions:</h4>
      <ul class="list-disc pl-4">
        <li>Enter your name and press start button to start the game.</li>
        <li>The game have 10 questions about programming languages.</li>
        <li>Each question consists between 2 and 4 possible answers.</li>
        <li>You will have 30 seconds to choose an answer.</li>
        <li>The score will be calculated by the reaming time on each question.</li>
        <li>You can visit the ranking pressing on the ranking button</li>
        <li>Enjoy it.</li>
      </ul>

      <div class="mt-10 flex flex-col">
        <div class="mb-4">
          <input
            v-model="state.username"
            type="text"
            placeholder="Enter your name"
            class="w-full h-10 border border-secondary rounded-md outline-none focus:border-primary pl-2"
            @keyup.enter="startGameHandler"
          />
          <span v-show="state.areThereErrors" class="text-red-600 text-sm"
            >Introduce a valid name. It must contain at least 3 characters</span
          >
        </div>

        <div class="flex flex-col gap-y-2">
          <Button
            class="rounded-md"
            :disabled="state.username === '' || state.areThereErrors"
            @click="startGameHandler"
            >Start</Button
          >
          <Button variant="secondary" class="rounded-md" @click="gotoRankingHandler"
            >Ranking</Button
          >
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch, ref } from '@nuxtjs/composition-api'
import { buildComponentContext } from '~/utils/ComponentContext'

interface MainState {
  username: string
  areThereErrors: boolean
  isUsernameDirty: boolean
}

enum Pages {
  Game = 'game',
  Ranking = 'ranking'
}

export default defineComponent({
  layout: 'main',
  setup(_, setupContext) {
    const context = buildComponentContext(setupContext)
    const username = ref<string>('')

    const state: MainState = reactive({
      username,
      areThereErrors: computed(() => state.username.length < 3 && state.isUsernameDirty),
      isUsernameDirty: false
    })

    watch(username, () => {
      state.isUsernameDirty = true
    })

    const startGameHandler = () => {
      if (state.username !== '' && !state.areThereErrors)
        context.$router.replace({ name: Pages.Game, query: { username: state.username } })
    }

    const gotoRankingHandler = () => {
      context.$router.replace(Pages.Ranking)
    }

    return { state, startGameHandler, gotoRankingHandler }
  }
})
</script>

<style></style>
