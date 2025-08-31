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
            {{ user.firstName }} {{ user.lastName }}
          </span>

          <!-- age -->
          <span class="text-gray-500"> ({{ user.age }} years) </span>
        </div>
        <div class="actions">
          <span>edit</span>
          <span @click="listController.singleItemDelete(user.id)">delete</span>
        </div>
      </div>
    </div>
  </div>
  <div>
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
import { defineAsyncComponent, onMounted, ref } from "vue";
import ListController from "../../domain/classes/users-list-controller";

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
button {
  margin-left: 15px;
}
.actions {
  float: right;
  width: 20%;
}
.actions span {
  margin-right: 30px;
  float: right;
  font-size: 14px;
}
.left-column {
  float: left;
  width: 80%;
}
.blue-bg {
  background-color: rgb(60, 63, 63);
}
</style>
