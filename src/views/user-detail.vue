<template>
  <div class="main-wrapper">
    <div class="shadow p-6 flex justify-between border">
      <div class="flex items-start">
        <img src="../assets/images/static.jpg" class="w-40 h-40 object-cover rounded-full" />
        <div class="ml-4">
          <h1 class="font-bold text-2xl">{{ user_detail.nickname }}</h1>
          <span>{{ user_detail.headline }}</span>
        </div>
      </div>

      <div class="btn self-end">
        <router-link v-if="me?._id === id" :to="{ name: 'EditUser', params: { id: me._id } }">
          <span>编辑个人信息</span>
        </router-link>
        <span v-else>
          <div v-show="me?.followings?.includes(id)">已关注</div>
          <div v-show="!me?.followings?.includes(id)">关注</div>
        </span>
      </div>
    </div>
    <router-view name="nav"></router-view>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import useUser from '@/hooks/useUser'
const route = useRoute()
const store = useStore()
const me = computed(() => store.state.userInfo)

const id = route.params.id

const { user_detail, fetchUserDetail } = useUser()
fetchUserDetail(id)
</script>
<style scoped>
</style>