<template>
  <edit-user-form
    :form-title="'Edit User'"
    :id="
      Array.isArray($route.query.id)
        ? $route.query.id[0] ?? undefined
        : $route.query.id ?? undefined
    "
  />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const EditUserForm = defineAsyncComponent(
  () => import("@app/presentation/components/edit-user-form/edit-user-form.vue")
);
</script>

<style scoped></style>
