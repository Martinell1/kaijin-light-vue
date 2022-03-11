<template>
  <div class="main-wrapper">
    <div class="shadow p-6 flex justify-between border">
      <div class="flex items-start">
        <Upload v-if="user_detail._id === me?._id" @onUpload="AvatarHandle" />
        <img :src="user_detail.avatar_url" class="w-40 h-40 object-cover rounded-full" />
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
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import useUser from '@/hooks/useUser'
import Upload from '../components/base/upload/upload.vue';

const route = useRoute()
const store = useStore()
const me = computed(() => store.state.userInfo)

const id = route.params.id

const { user_detail, fetchUserDetail, modifyUser } = useUser()
fetchUserDetail(id)

watch(() => route.params.id, (newID) => {
  fetchUserDetail(newID)
})

const AvatarHandle = async (url) => {
  user_detail.value.avatar_url = url
  await modifyUser('avatar_url', user_detail.value._id, user_detail.value)
}
</script>
<style scoped>
</style>