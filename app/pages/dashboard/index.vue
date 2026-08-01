<template>
  <div class="flex flex-col items-center">
    <AuthUserProfile v-if="provider.isSignedIn.value" />
  </div>
</template>

<script setup lang="ts">
const provider = useAuth()
</script>

<style scoped></style>
