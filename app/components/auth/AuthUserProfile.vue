<template>
  <div>
    <template v-if="user">
      <img v-if="user.avatarUrl" :src="user.avatarUrl" style="width: 64px; height: 64px; border-radius: 50%" >
      <h2>{{ user.name || user.email }}</h2>
      <p>{{ user.email }}</p>
      <el-button @click="provider.signOut()">Sign Out</el-button>
    </template>
    <p v-else>Not signed in</p>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const provider = useAuth()
const user = computed(() => provider.user.value)
</script>
