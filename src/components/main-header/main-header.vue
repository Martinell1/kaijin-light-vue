<template>
  <div class="w-full h-[3.75rem] bg-slate-50 shadow mb-4">
    <div class="flex justify-between items-center h-full xl:mx-[25rem]">
      <div class="flex">
        <router-link :to="{ name: 'Questions' }">
          <div class="nav">Question</div>
        </router-link>
        <router-link :to="{ name: 'Articles' }">
          <div class="nav">Article</div>
        </router-link>
      </div>

      <div class="flex">
        <div class="flex mr-10">
          <input class="bg-zinc-50 w-80 outline-rose-300 pl-4" type="text" />
          <div class="btn">Search</div>
        </div>

        <img v-if="avatar_url" src="../../assets/images/static.jpg" class="w-10 h-10 rounded-full" />
        <div v-if="!avatar_url" class="flex">
          <div class="btn" @click="showLogin">Login</div>
          <div class="btn">Register</div>
        </div>
      </div>
    </div>
  </div>
  <Modal ref="modalRef">
    <Login @hide="hideLogin" />
  </Modal>
</template>

<script setup>
import { computed, ref } from 'vue';
import Modal from '../modal/modal.vue';
import Login from '../../views/login.vue';
import store from '../../store';

const avatar_url = computed(() => store.state.userInfo?.avatar_url)

const modalRef = ref(null)
const showLogin = () => {
  modalRef.value.show()
}

const hideLogin = () => {
  modalRef.value.hide()
}



</script>
<style scoped>
.nav {
  @apply text-center text-rose-500 font-semibold text-xl w-28 h-10 leading-10 cursor-pointer;
}
</style>