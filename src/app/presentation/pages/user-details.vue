<template>
  >>>>> CI/CD Demo with Ali
  <user-info
    :id="
      Array.isArray($route.query.id)
        ? $route.query.id[0] ?? undefined
        : $route.query.id ?? undefined
    "
  />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const UserInfo = defineAsyncComponent(
  () => import("@app/presentation/components/user-info/user-info.vue")
);
</script>

<style scoped></style>
