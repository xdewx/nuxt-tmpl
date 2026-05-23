<template>
  <span style="cursor: pointer" @click="provider.openSignUp?.()">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const provider = useAuth()
</script>
