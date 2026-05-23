<template>
  <div class="flex flex-col items-center">
    <AuthUserProfile v-if="provider.isSignedIn.value" />
  </div>
</template>

<script setup lang="ts">
import AuthUserProfile from "~/components/auth/AuthUserProfile.vue";
import { useAuth } from "~/composables/useAuth";

const provider = useAuth();
</script>

<style scoped></style>
