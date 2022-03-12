<template>
  <router-view></router-view>
</template>

<script setup>
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex';
const store = useStore()
const userInfo = computed(() => store.state.userInfo)




</script>
<style scoped>
</style>