<template>
  <MainHeader></MainHeader>
  <div class="home-wrapper">
    <router-view></router-view>
  </div>
</template>

<script setup>
import MainHeader from '../components/main-header/main-header.vue';

</script>
<style scoped>
.home-wrapper {
}
</style>