<template>
  <div v-show="visible" class="dropdown">
    <div class="py-1">
      <router-link :to="{ name: 'UserDetail', params: { id: userInfo._id } }">
        <div class="dropdown-item">我的主页</div>
      </router-link>
      <div class="dropdown-item">写文章</div>
      <div class="dropdown-item">提问题</div>
      <div class="dropdown-item">退出</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex';

const store = useStore()
const userInfo = computed(() => store.state.userInfo)
const visible = ref(false)
const show = () => {
  visible.value = true
}

const hide = () => {
  visible.value = false
}

const shiftVisible = () => {
  visible.value = !visible.value
}

defineExpose({
  show,
  hide,
  shiftVisible
})
</script>

<style scoped>
.dropdown {
  @apply absolute -left-16 text-left mt-2 w-48 rounded-md shadow-lg border bg-zinc-50;
}
.dropdown-item {
  @apply text-stone-700 block w-full px-4 py-2 cursor-pointer;
}
</style>