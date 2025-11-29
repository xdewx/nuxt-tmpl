<template>
  <div class="relative">
    <div class="absolute top-20px left-0 right-0 mx-auto color-white w-400px">
      <div class="feature">
        <el-tag type="primary" class="feature-name">unplugin-icons</el-tag
        ><el-icon size="24" color="red"><LineMdIconify2Static /></el-icon>
      </div>
      <div class="feature">
        <el-tag type="primary" class="feature-name">i18n</el-tag
        >{{ t("hello") }}
      </div>
      <div class="feature">
        <el-tag type="primary" class="feature-name" @contextmenu="onContextMenu"
          >contextmenu</el-tag
        >
      </div>
    </div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">
import LineMdIconify2Static from "~icons/line-md/iconify2-static";
import { useContextMenu } from "~/composables/context-menu";
const { t } = useI18n();

const onContextMenu = (e: MouseEvent) => {
  useContextMenu(e, {
    items: [
      {
        label: "menu",
        icon: h(LineMdIconify2Static),
        onClick: () => {
          ElMessage.success({
            message: "menu clicked",
          });
        },
      },
    ],
  });
};
</script>

<style lang="scss" scoped>
.feature {
  display: flex;
  align-items: center;
  margin: 5px;
  &-name {
    width: 120px;
  }
}
</style>
