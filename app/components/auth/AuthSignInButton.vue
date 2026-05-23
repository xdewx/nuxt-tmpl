<template>
  <span style="cursor: pointer" @click="provider.openSignIn?.()">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const provider = useAuth()
</script>
