<template>
  <create-user-form :form-title="'Create new USER'" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const CreateUserForm = defineAsyncComponent(
  () =>
    import("@app/presentation/components/create-user-form/create-user-form.vue")
);
</script>

<style scoped></style>
