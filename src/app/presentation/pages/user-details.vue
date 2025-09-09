<template>
  <user-info :id?="$route.query.id" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const UserInfo = defineAsyncComponent(
  () => import("../components/user-info/user-info.vue")
);
</script>

<style scoped></style>
