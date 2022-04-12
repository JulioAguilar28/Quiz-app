<template>
  <main class="flex flex-col justify-between flex-grow">
    <div class="table w-full p-4">
      <div class="table-header-group">
        <div class="table-row">
          <div class="table-cell text-xl text-primary pb-4">Username</div>
          <div class="table-cell text-xl text-primary text-center">Score</div>
        </div>
      </div>
      <div class="table-row-group">
        <div v-for="user in state.users" :key="user.username" class="table-row">
          <div class="table-cell text-secondary">{{ user.username }}</div>
          <div class="table-cell text-center">{{ user.score }}</div>
        </div>
      </div>
    </div>

    <footer class="mb-6 mr-6 self-end">
      <Button class="md:w-32" @click="gotoMainHandler">Main menu</Button>
    </footer>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from '@nuxtjs/composition-api'
import * as StorageService from '@/services/StorageService'
import { UserRanking } from '@/models/AppModels'
import { buildComponentContext } from '@/utils/ComponentContext'

interface RankingControllerState {
  users: Array<UserRanking>
}

export default defineComponent({
  setup(_, setupContext) {
    const context = buildComponentContext(setupContext)

    const state: RankingControllerState = reactive({
      users: []
    })

    onMounted(() => {
      state.users = StorageService.getUsers()
    })

    const gotoMainHandler = () => {
      context.$router.replace('main')
    }

    return { state, gotoMainHandler }
  }
})
</script>

<style></style>
