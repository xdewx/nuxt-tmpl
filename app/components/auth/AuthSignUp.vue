<template>
  <component :is="signUpForm" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import DefaultSignUp from './DefaultSignUp.vue'

const provider = useAuth()
const signUpForm = computed(() => provider.SignUpForm || DefaultSignUp)
</script>
