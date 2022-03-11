<template>
  <div class="main-wrapper">
    <div class="shadow p-6 flex justify-between border">
      <div class="flex items-start">
        <div v-if="user_detail._id === me._id">
          <label for="upload" class="w-40 h-40 absolute block"></label>
          <input
            ref="avatarRef"
            id="upload"
            type="file"
            class="hidden"
            @change="AvatarHandle"
            multiple="true"
            enctype="multipart/form-data"
            accept="image/*"
          />
        </div>
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
import { ref, computed, watch,inject } from 'vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import useUser from '@/hooks/useUser'
import {uploadImage , toQiNiu} from '@/api/home'
const route = useRoute()
const store = useStore()
const useMessage = inject('useMessage')
const me = computed(() => store.state.userInfo)

const id = route.params.id

const { user_detail, fetchUserDetail,modifyUser } = useUser()
fetchUserDetail(id)

watch(() => route.params.id, (newID) => {
  fetchUserDetail(newID)
})

const avatarRef = ref(null)
const AvatarHandle = async () => {
  const file = avatarRef.value.files[0];
  let { data: token } = await uploadImage();
  if (token) {
    const form = new FormData();
    form.append("token", token)
    form.append("file", file)
    let { data: addr } = await toQiNiu(form);
    user_detail.value.avatar_url = "http://qiniu.kaijinx.top/" + addr.key;
    let newUser = await modifyUser('avatar_url', user_detail.value._id, user_detail.value)
    if (newUser) {
      userInfo.value = newUser;
      useMessage('SUCCESS', '更新成功', 2000)
      fetchUserDetail(newUser._id)
    }

  }
}
</script>
<style scoped>
</style>