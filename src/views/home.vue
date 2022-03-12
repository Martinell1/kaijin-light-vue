<template>
  <MainHeader></MainHeader>
  <div class="main-wrapper flex">
    <router-view></router-view>
    <router-view name="aside"></router-view>
  </div>
</template>

<script setup>
import MainHeader from '../components/base/main-header/main-header.vue';
</script>
<style scoped>
.home-wrapper {
}
</style>