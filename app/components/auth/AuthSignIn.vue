<template>
  <component :is="signInForm" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import DefaultSignIn from './DefaultSignIn.vue'

const provider = useAuth()
const signInForm = computed(() => provider.SignInForm || DefaultSignIn)
</script>
