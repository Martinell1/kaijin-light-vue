<template>
  <div class="shadow border mt-4 px-5 py-4 space-y-10">
    <router-link
      :to="{ name: 'UserDetail', params: { id: route.params.id } }"
      class="flex justify-end"
    >
      <div class="btn">返回主页</div>
    </router-link>

    <div class="form-item">
      <label class="form-label">昵称</label>
      <input v-model="user_detail.nickname" type="text" class="w-full form-input" />
      <div class="btn ml-4" @click="modifyHandle('nickname')">修改</div>
    </div>
    <div class="form-item">
      <label class="form-label">性别</label>
      <div class="w-full pl-4">
        <input type="radio" v-model="user_detail.gender" v-bind:value="'male'" />男
        <input type="radio" v-model="user_detail.gender" v-bind:value="'female'" />女
      </div>
      <div class="btn ml-4" @click="modifyHandle('gender')">修改</div>
    </div>
    <div class="form-item">
      <label class="form-label">简介</label>
      <input v-model="user_detail.headline" type="text" class="w-full form-input" />
      <div class="btn ml-4" @click="modifyHandle('headline')">修改</div>
    </div>
    <!-- <div class="form-item">
      <label class="form-label">公司</label>
      
      <div class="flex w-full space-x-4">
        <input v-model="user_detail.employment[0].company" type="text" class="flex-1 form-input" />
        <input v-model="user_detail.employment[0].job" type="text" class="flex-1 form-input" />
      </div>
      <div class="btn ml-4" @click="modifyHandle('employments')">修改</div>
    </div>
    <div class="form-item">
      <label class="form-label">教育</label>
      <div class="flex w-full space-x-4">
        <input v-model="user_detail.education[0]?.school" type="text" class="flex-1 form-input" />
        <input v-model="user_detail.education[0]?.major" type="text" class="flex-1 form-input" />
      </div>
      <div class="btn ml-4" @click="modifyHandle('education')">修改</div>
    </div>-->
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import useUser from '../../hooks/useUser'
const route = useRoute()
const { user_detail, fetchUserDetail, modifyUser } = useUser()
fetchUserDetail(route.params.id)
const modifyHandle = (field) => {
  modifyUser(field, user_detail.value._id, user_detail.value)
}
</script>
<style scoped>
.form-item {
  @apply flex items-center;
}
.form-label {
  @apply w-20;
}

.form-input {
  @apply px-4 border-gray-300 rounded-md outline-none h-10;
}
</style>