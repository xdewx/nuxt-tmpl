<template>
  <span v-if="user" style="cursor: pointer" @click="provider.openUserProfile?.()">
    <img
      v-if="user.avatarUrl"
      :src="user.avatarUrl"
      style="width: 32px; height: 32px; border-radius: 50%"
    >
    <span v-else>{{ user.name || user.email }}</span>
  </span>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const provider = useAuth()
const user = computed(() => provider.user.value)
</script>
