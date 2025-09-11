<template>
  <div
    id="app"
    class="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 space-y-8"
  >
    <h3>{{ infoTitle }}</h3>
    <h1 class="text-3xl font-bold text-center text-gray-800">
      {{ createUserController.getFullName(person.firstName, person.lastName) }}
    </h1>

    <div class="space-y-6">
      <!-- Personal Information Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Age</label>
          <p class="mt-1 text-gray-900">{{ person.age }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <p class="mt-1 text-gray-900">{{ person.email }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Phone</label>
          <p class="mt-1 text-gray-900">{{ person.phone }}</p>
        </div>
      </div>

      <!-- Address Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Street</label>
          <p class="mt-1 text-gray-900">{{ person.address.street }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">City</label>
          <p class="mt-1 text-gray-900">{{ person.address.city }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Country</label>
          <p class="mt-1 text-gray-900">{{ person.address.country }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRef } from "vue";
import type { TPerson } from "@app/domain/contract/i-types";
import { PersonInfoProps } from "../user-info/user-info";
import EditUserController from "@app/domain/classes/edit-user-controller";

const props = defineProps(PersonInfoProps);

const infoTitle = toRef(props, "infoTitle");
const personID = toRef(props, "id");

const createUserController = reactive(new EditUserController(personID.value));

const person = ref<TPerson>(createUserController.user);

onMounted(async () => {
  person.value = await createUserController.getPersonData(personID.value!);
});
</script>

<style scoped>
p {
  color: black;
}
h3 {
  color: red;
}
</style>
