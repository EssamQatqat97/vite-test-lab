<template>
  <div class="main-menu">
    <main-menu />
  </div>
  <div class="page-body">
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const MainMenu = defineAsyncComponent(
  () => import("./app/presentation/components/navigator.vue")
);
</script>
<style lang="css" scoped>
.link {
  margin-left: 20px;
  color: aliceblue;
  text-decoration: none;
}
.link:hover {
  color: crimson;
}
.main-menu,
.page-body {
  margin-top: 40px;
  float: left;
  width: 100%;
}
</style>
