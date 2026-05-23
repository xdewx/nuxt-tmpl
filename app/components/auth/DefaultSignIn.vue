<template>
  <form class="w-80 mx-auto space-y-4" @submit.prevent="handleSignIn">
    <h2 class="text-xl font-bold text-center">{{ $t('signIn') }}</h2>
    <el-input v-model="email" type="email" placeholder="Email" />
    <el-input v-model="password" type="password" placeholder="Password" />
    <el-button type="primary" native-type="submit" :loading="loading" class="w-full">
      {{ $t('signIn') }}
    </el-button>
    <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
  </form>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { signIn } = useAuth()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleSignIn() {
  loading.value = true
  error.value = ''
  const result = await signIn({ email: email.value, password: password.value })
  if (!result.success) {
    error.value = result.error
  }
  loading.value = false
}
</script>
