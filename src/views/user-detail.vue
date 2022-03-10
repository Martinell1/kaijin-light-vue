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
          />
        </div>
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
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import useUser from '@/hooks/useUser'
const route = useRoute()
const store = useStore()
const me = computed(() => store.state.userInfo)

const id = route.params.id

const { user_detail, fetchUserDetail } = useUser()
fetchUserDetail(id)

watch(() => route.params.id, (newID) => {
  fetchUserDetail(newID)
})

const avatarRef = ref(null)
const AvatarHandle = async () => {
  const file = avatarRef.value.files[0];
  let { data: result } = await upload();
  if (result.code === 200) {
    const form = new FormData();
    form.append("token", result.data)
    form.append("file", file)

    console.log(form);
    // let { data: res } = await toQiNiu(form);

    // const addr = "http://qiniu.kaijinx.top/" + res.key;
    // console.log(addr);

    // const params = new FormData();
    // params.append('_id', userInfo.value._id)
    // params.append('avater', addr)

    // let { data: result2 } = await updateUserInfo(params);
    // if (result2.code === 200) {
    //   userInfo.value = result2.data;

    //   msg('success', '更新成功')
    //   loadUserInfo(userInfo.value._id)
    //   localStorage.setItem("avater", userInfo.value.avater)
    //   store.commit('updateUserInfo', { "id": userInfo.value._id, "nickname": userInfo.value.nickname, "avater": userInfo.value.avater })
    // }

  }
}
</script>
<style scoped>
</style>