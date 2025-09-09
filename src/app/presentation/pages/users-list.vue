<template>
  <div class="container">
    <div v-if="listController.showSpinner"><Spinner /></div>
    <div v-if="!listController.showSpinner && !listController.users.total">
      NO Data
    </div>
    <div
      v-if="!listController.showSpinner && !!listController.users.data.length"
    >
      <div class="flex items-center gap-3 p-2 border-b">
        <input
          type="checkbox"
          v-model="listController.allSelected"
          @change="listController.toggleAll"
          :indeterminate="listController.selectAllIndeterminate"
        />
        <select
          v-model="listController.action"
          @change="listController.handleAction"
          id="bulk-action"
        >
          <option value="SelectOption">More Options</option>
          <option value="SelectAll">Select all</option>
          <option value="DeselectAll">Deselect all</option>
          <hr />
          <option value="Delete">Delete</option>
        </select>
      </div>
      <div
        v-for="(user, index) in listController.users.data"
        :key="user.id"
        class="flex items-center gap-3 p-2 border-b"
        :class="{ 'blue-bg': index % 2 == 0 }"
      >
        <div class="left-column">
          <!-- checkbox -->
          <input
            type="checkbox"
            v-model="listController.selected"
            :value="user.id"
            @change="listController.updateSelected"
          />

          <!-- full name -->
          <span class="font-medium">
            {{ listController.getFullName(user.firstName, user.lastName) }}
          </span>

          <!-- age -->
          <span class="text-gray-500"> ({{ user.age }} years) </span>
        </div>
        <div class="actions">
          <RouterLink
            :to="{ name: 'Edit user', query: { id: user.id } }"
            class="page-link"
            >Edit</RouterLink
          >
          <button @click="listController.singleItemDelete(user.id)">
            Delete
          </button>
          <RouterLink
            :to="{ name: 'User Info', query: { id: user.id } }"
            class="page-link"
          >
            <i class="fa-solid fa-circle-info"></i>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
  <div class="navigation">
    <button
      @click="listController.main('back')"
      :disabled="listController.pageIndex == 1 || listController.showSpinner"
    >
      &lt; Back
    </button>
    <button
      @click="listController.main('next')"
      :disabled="
        Math.ceil(listController.users.total / listController.limit) ==
          listController.pageIndex ||
        listController.showSpinner ||
        !listController.users.total
      "
    >
      Next &gt;
    </button>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { defineAsyncComponent, onMounted, ref } from "vue";
import ListController from "../../domain/classes/list-controller";

const listController = ref(new ListController(0, 5));

onMounted(() => {
  listController.value.main(); // fetch after component is mounted
});

const Spinner = defineAsyncComponent(() => import("../components/spinner.vue"));
</script>

<style scoped>
.container {
  width: 100%;
  height: 320px;
}
.items-center {
  width: 100%;
  text-align: left;
  height: 28px;
}
.actions {
  float: right;
  width: 25%;
}
.actions span {
  /* margin-right: 30px; */
  float: right;
  font-size: 14px;
}
.left-column {
  float: left;
  width: 75%;
}
.blue-bg {
  background-color: rgb(60, 63, 63);
}
.page-link {
  margin-left: 10%;
}
.actions button {
  background: none; /* remove background */
  border: none; /* remove borders */
  color: #3498db; /* text color */
  font-size: 16px; /* font size */
  cursor: pointer; /* pointer cursor on hover */
  padding: 0;
  margin-left: 10%;
}
.actions button:hover {
  color: red;
}
.navigation button {
  margin-left: 15px;
}
.font-medium {
  margin-left: 4%;
}
</style>
