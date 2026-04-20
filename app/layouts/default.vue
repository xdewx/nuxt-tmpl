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
            <Show when="signed-out">
              <SignInButton mode="modal">
                <el-button size="small" type="primary">{{
                  $t("signIn")
                }}</el-button>
              </SignInButton>
              <SignUpButton mode="modal">
                <el-button size="small" type="primary">{{
                  $t("signUp")
                }}</el-button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </nav>
        </div>
      </div>
    </div>
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>

<script setup>
import {
  SignInButton,
  SignUpButton,
  UserButton,
  Show,
} from "@clerk/nuxt/components";
import { useAuth } from "@clerk/nuxt/composables";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const { isLoaded, isSignedIn } = useAuth();
const route = useRoute();
const router = useRouter();
watch(
  [() => isLoaded.value, () => isSignedIn.value],
  ([loaded, signedIn]) => {
    // console.info(loaded,signedIn,route.path)
    if (!loaded) {
      return;
    }

    if (signedIn && route.path === "/") {
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
