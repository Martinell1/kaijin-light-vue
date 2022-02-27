<template>
  <div class="w-full h-[3.75rem] bg-slate-50 shadow box-border mb-5">
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
        <div class="flex mr-10 items-center">
          <input class="bg-zinc-50 w-80 outline-rose-300 pl-4" type="text" />
          <div class="btn">Search</div>
        </div>

        <div v-if="avatar_url" class="relative" id="drop-down-wrapper">
          <img
            src="../../../assets/images/static.jpg"
            class="w-10 h-10 rounded-full cursor-pointer"
            @click="avatarClick"
          />
          <Dropdown ref="dropdownRef"></Dropdown>
        </div>
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
import Login from '../../../views/login.vue';
import { useStore } from 'vuex';
import Dropdown from '../dropdown/dropdown.vue';

const store = useStore()
const avatar_url = computed(() => store.state.userInfo?.avatar_url)

const modalRef = ref(null)
const showLogin = () => {
  modalRef.value.show()
}

const hideLogin = () => {
  modalRef.value.hide()
}

const dropdownRef = ref(null)
const avatarClick = () => {
  dropdownRef.value.shiftVisible()
}


</script>
<style scoped>
.nav {
  @apply text-center text-rose-500 font-semibold text-xl w-28 h-10 leading-10 cursor-pointer;
}
</style>