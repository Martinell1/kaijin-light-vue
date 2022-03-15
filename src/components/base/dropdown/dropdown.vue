<template>
  <div v-show="visible" class="dropdown" @click="hide" @focusout="hide">
    <div class="py-1">
      <router-link :to="{ name: 'UserDetail', params: { id: userInfo._id } }">
        <div class="dropdown-item">我的主页</div>
      </router-link>
      <router-link :to="{ name: 'Edit' }">
        <div class="dropdown-item">写文章</div>
      </router-link>

      <div class="dropdown-item" @click="askQuestion">提问题</div>
      <router-link :to="{ name: 'Moment' }">
        <div class="dropdown-item">写动态</div>
      </router-link>

      <router-link :to="{ name: 'UploadResource' }">
        <div class="dropdown-item">上传</div>
      </router-link>
      <div class="dropdown-item" @click="logOut">退出</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
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

const route = useRoute()
watch(() => route.path, () => {
  hide()
})

const emit = defineEmits(['askQuestion'])
const askQuestion = () => {
  emit('askQuestion')
}

const router = useRouter()
const logOut = () => {
  store.dispatch('logOut')
  router.go(0)
}
</script>

<style scoped>
.dropdown {
  @apply absolute -left-16 text-left mt-2 w-48 rounded-md shadow-lg border bg-zinc-50;
}
.dropdown-item {
  @apply text-stone-700 block w-full px-4 py-2 cursor-pointer;
}
</style>