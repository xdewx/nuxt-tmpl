<template>
  <div class="flex flex-col w-full h-full">
    <div class="border-b border-b-solid" style="border-color: var(--el-border-color-light)">
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
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const provider = useAuth()
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const afterSignInRoute
  = (config.public?.nuxtTmpl as any)?.afterSignInRoute ?? '/dashboard'
const guestRoutes
  = ((config.public as any)?.nuxtTmpl?.guestRoutes ?? []) as string[]
const publicRoutes
  = ((config.public as any)?.nuxtTmpl?.publicRoutes ?? []) as string[]

const authMode = computed(() =>
  getAuthMode(route.path, route.meta, guestRoutes, publicRoutes),
)

watch(
  [() => provider.isLoaded.value, () => provider.isSignedIn.value, authMode],
  ([loaded, signedIn, mode]) => {
    if (!loaded || provider.id === 'none')
      return

    if (signedIn && mode === 'guest') {
      router.push(afterSignInRoute)
      return
    }

    if (!signedIn && mode === 'required') {
      router.push('/')
    }
  },
  { immediate: true },
)
</script>
