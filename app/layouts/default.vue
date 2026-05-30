<template>
  <div class="flex flex-col w-full h-full">
    <div class="border-b">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-10">
          <div class="flex-shrink-0">
            <el-link type="primary" href="/" class="text-lg font-bold">{{
              $t("appName")
            }}</el-link>
          </div>
          <nav class="flex items-center space-x-4">
            <template v-if="provider.id !== 'none'">
              <template v-if="!provider.isSignedIn.value">
                <AuthSignInButton>
                  <el-button size="small" type="primary">{{
                    $t("signIn")
                  }}</el-button>
                </AuthSignInButton>
                <AuthSignUpButton>
                  <el-button size="small" type="primary">{{
                    $t("signUp")
                  }}</el-button>
                </AuthSignUpButton>
              </template>
              <AuthUserButton v-else />
            </template>
          </nav>
        </div>
      </div>
    </div>
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthSignInButton from "~/components/auth/AuthSignInButton.vue";
import AuthSignUpButton from "~/components/auth/AuthSignUpButton.vue";
import AuthUserButton from "~/components/auth/AuthUserButton.vue";
import { useAuth } from "~/composables/useAuth";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { isSafeRoute } from "#shared/utils/route";

const provider = useAuth();
const route = useRoute();
const router = useRouter();

watch(
  [() => provider.isLoaded.value, () => provider.isSignedIn.value],
  ([loaded, signedIn]) => {
    if (!loaded) return;

    if (signedIn && isSafeRoute(route.path)) {
      router.push("/dashboard");
      return;
    }

    if (
      !signedIn &&
      route.path !== "/" &&
      route.path !== "/sign-in" &&
      route.path !== "/sign-up"
    ) {
      router.push("/");
    }
  },
  { immediate: true },
);
</script>
