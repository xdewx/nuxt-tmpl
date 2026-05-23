<template>
  <div class="h-full p-8 rounded-lg flex flex-col">
    <h1 class="text-2xl font-bold text-center mb-6">{{ $t("signIn") }}</h1>
    <div class="flex-1 justify-center flex">
      <AuthSignIn with-sign-up transferable />
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthSignIn from "~/components/auth/AuthSignIn.vue";
</script>
