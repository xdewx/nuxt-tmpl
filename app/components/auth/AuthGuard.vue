<template>
  <slot v-if="provider.isSignedIn.value" />
  <slot v-else name="fallback">
    <div>Please sign in to view this content.</div>
  </slot>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const provider = useAuth()
</script>
