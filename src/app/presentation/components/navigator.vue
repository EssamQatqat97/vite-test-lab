<template>
  <nav>
    <template v-for="(item, idx) in $router.getRoutes()"
      ><div
        v-if="idx <= 1"
        class="menu-item"
        :class="{
          'active-item': $route.fullPath === item.path,
          'none-active-item': $route.fullPath != item.path,
        }"
      >
        <RouterLink :to="item.path">{{ item.name }}</RouterLink>
      </div></template
    >
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped>
.menu-item {
  float: left;
  margin-left: 20px;
}
.active-item a {
  color: coral !important;
}
.none-active-item a {
  color: rgb(255, 255, 255);
}
</style>
