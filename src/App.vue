<template>
  <MainHeader></MainHeader>
  <router-view v-slot="{ Component }" class="bg-zinc-50">
    <component :is="Component"></component>
  </router-view>
</template>

<script setup>
import MainHeader from './components/main-header/main-header.vue';

</script>
<style scoped>
</style>