<template>
  <div>
    <Button>Holaalall</Button>
    <Input />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'

export default Vue.extend({
  components: { Button, Input }
})
</script>
