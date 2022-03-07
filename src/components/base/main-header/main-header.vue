<template>
  <div class="w-full h-[3.75rem] bg-slate-50 shadow box-border mb-5">
    <div class="flex justify-between items-center h-full xl:mx-[25rem]">
      <div class="flex">
        <router-link :to="{ name: 'Questions' }">
          <h1 class="nav text-4xl mr-10">LightHub</h1>
        </router-link>
        <router-link :to="{ name: 'Questions' }">
          <div class="nav w-28 text-xl">Question</div>
        </router-link>
        <router-link :to="{ name: 'Articles' }">
          <div class="nav w-28 text-xl">Article</div>
        </router-link>
      </div>

      <div class="flex">
        <div class="flex mr-10 items-center">
          <input
            v-model="key"
            v-on:keypress.enter="searchHandle"
            class="border h-10 bg-zinc-50 w-80 outline-rose-300 pl-4"
            type="text"
            placeholder="请输入关键字"
          />
          <div class="btn" @click="searchHandle">Search</div>
        </div>

        <div v-if="userInfo?._id" class="relative" id="drop-down-wrapper">
          <img
            src="../../../assets/images/static.jpg"
            class="w-10 h-10 rounded-full cursor-pointer"
            @click="avatarClick"
          />
          <Dropdown ref="dropdownRef" @askQuestion="askQuestionHandle"></Dropdown>
        </div>
        <div v-if="!userInfo?._id" class="flex">
          <div class="btn" @click="showLogin(false)">Login</div>
          <div class="btn ml-4" @click="showLogin(true)">Register</div>
        </div>
      </div>
    </div>
  </div>
  <Modal ref="loginModalRef" :title="isRegister ? 'Register' : 'Login'">
    <Login :isRegister="isRegister" @hide="hideLogin" />
  </Modal>
  <Modal ref="askModalRef" :title="'提问题'">
    <AskQuestion @hide="hideAsk"></AskQuestion>
  </Modal>
</template>

<script setup>
import { computed, ref, inject } from 'vue';
import Modal from '../modal/modal.vue';
import Login from '../../../views/login.vue';
import { useStore } from 'vuex';
import Dropdown from '../dropdown/dropdown.vue';
import AskQuestion from '../../ask-question/ask-question.vue';
import { useRouter } from 'vue-router';

const store = useStore()
const userInfo = computed(() => store.state.userInfo)

const loginModalRef = ref(null)
const isRegister = ref(false)
const showLogin = (info) => {
  loginModalRef.value.show()
  isRegister.value = info
}

const hideLogin = () => {
  loginModalRef.value.hide()
}

const dropdownRef = ref(null)
const avatarClick = () => {
  dropdownRef.value.shiftVisible()
}

const askModalRef = ref(null)
const askQuestionHandle = () => {
  askModalRef.value.show()
}

const hideAsk = () => {
  askModalRef.value.hide()
}

const useMessage = inject('useMessage')
const router = useRouter()
const key = ref('')
const searchHandle = () => {
  if (key.value === '') {
    useMessage('FAIL', '关键字不能为空', 2000)
    return
  }
  router.push({
    name: 'Search',
    params: {
      key: key.value
    }
  })
}

</script>
<style scoped>
.nav {
  @apply text-center text-rose-500 font-semibold  h-10 leading-10 cursor-pointer;
}
</style>