<template>
  <div
    id="app"
    class="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 space-y-8"
  >
    <h1 class="text-3xl font-bold text-center text-gray-800">
      {{ formTitle }}
    </h1>

    <div class="space-y-6">
      <!-- Personal Information Section -->
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              for="firstName"
              class="block text-sm font-medium text-gray-700"
              >First Name</label
            >
            <input
              type="text"
              id="firstName"
              v-model="person.firstName"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              for="lastName"
              class="block text-sm font-medium text-gray-700"
              >Last Name</label
            >
            <input
              type="text"
              id="lastName"
              v-model="person.lastName"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="age" class="block text-sm font-medium text-gray-700"
            >Age</label
          >
          <input
            type="number"
            id="age"
            v-model="person.age"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="person.email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700"
            >Phone</label
          >
          <input
            type="tel"
            id="phone"
            v-model="person.phone"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <!-- Address Section -->
      <div class="space-y-4">
        <div>
          <label for="street" class="block text-sm font-medium text-gray-700"
            >Street</label
          >
          <input
            type="text"
            id="street"
            v-model="person.address.street"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="city" class="block text-sm font-medium text-gray-700"
              >City</label
            >
            <input
              type="text"
              id="city"
              v-model="person.address.city"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="country" class="block text-sm font-medium text-gray-700"
              >Country</label
            >
            <input
              type="text"
              id="country"
              v-model="person.address.country"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      <div class="pt-4">
        <button
          @click="
            async () => {
              try {
                await createUserController.createNewPerson(person);
                router.push('/');
              } catch (error) {
                console.log(error);
              }
            }
          "
          type="submit"
          :disabled="createUserController.isBusy"
          class="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
        >
          <span>Create Person</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from "vue";
import { PersonFormProps } from "./create-user-form";
import CreateUserController from "@app/domain/classes/create-user-controller";
import router from "@root/router";

const props = defineProps(PersonFormProps);

const { formTitle, id: personID = ref("0") } = toRefs(props);
const createUserController = reactive(new CreateUserController(personID.value));

const person = createUserController.user;
</script>

<style scoped></style>
