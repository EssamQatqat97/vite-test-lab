<template>
  <user-form :is-new="false" :id="$route.query.id" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const UserForm = defineAsyncComponent(
  () => import("../components/user-form/user-form.vue")
);
</script>

<style scoped></style>
