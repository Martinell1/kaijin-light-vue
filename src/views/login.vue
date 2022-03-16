<template>
  <div class="w-[500px] p-5 bg-zinc-50">
    <form class="mt-8 space-y-6">
      <div class="rounded-md shadow-sm space-y-4">
        <div>
          <label for="account" class="sr-only">Account</label>
          <input
            v-model="userForm.account"
            id="account"
            autocomplete="account"
            required
            class="input"
            placeholder="Account"
          />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            v-model="userForm.password"
            id="password"
            type="password"
            autocomplete="current-password"
            required
            class="input"
            placeholder="Password"
          />
        </div>
        <div v-if="isRegister">
          <label for="nickname" class="sr-only">Password</label>
          <input
            v-model="userForm.nickname"
            id="nickname"
            autocomplete="current-password"
            required
            class="input"
            placeholder="nickname"
          />
        </div>
      </div>

      <div v-if="!isRegister">
        <button
          @click="handleLogin"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <LockClosedIcon
              class="h-5 w-5 text-rose-500 group-hover:text-rose-400"
              aria-hidden="true"
            />
          </span>
          Sign in
        </button>
      </div>
      <div v-if="isRegister">
        <button
          @click="handleRegister"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <LockClosedIcon
              class="h-5 w-5 text-rose-500 group-hover:text-rose-400"
              aria-hidden="true"
            />
          </span>
          Register in
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, inject } from 'vue';
import { useStore } from 'vuex';
import { LockClosedIcon } from '@heroicons/vue/solid'
import { login, register } from '@/api/user'
import { useRouter } from 'vue-router';
const useMessage = inject('useMessage')
defineProps({
  isRegister: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const store = useStore()

const emit = defineEmits(['hide'])
const useLogin = () => {
  const userForm = reactive({
    account: '',
    password: '',
    nickname: ''
  })

  const checkForm = () => {
    const checkAccount = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/)
    const checkPassword = new RegExp(/^[a-zA-Z]\w{5,17}$/)
    if (!checkAccount.test(userForm.account)) {
      useMessage('WARN', '用户名不符合规范 -- 字母开头，允许5-16字节，允许字母数字下划线', 2000)
      return false
    }
    if (!checkPassword.test(userForm.password)) {
      useMessage('WARN', '密码不符合规范 -- 以字母开头，长度在6~18之间，只能包含字母、数字和下划线', 2000)
      return false
    }

    return true
  }



  const handleRegister = async () => {
    if (!checkForm()) {
      return
    }
    const { data: result } = await register(userForm)
    if (result) {
      useMessage('SUCCESS', '注册成功', 2000)
      let timer = setTimeout(() => {
        router.go(0)
        emit('hide')
        timer = null
      }, 1000);
    } else {
      useMessage('FAIL', '注册失败', 2000)
    }
  }

  const handleLogin = async () => {
    if (!checkForm()) {
      return
    }
    const { data: { token, userInfo } } = await login(userForm)
    console.log('执行');
    if (token && userInfo) {
      localStorage.setItem("token", token)
      localStorage.setItem("userInfo", JSON.stringify(userInfo))
      useMessage('SUCCESS', '登录成功', 2000)
      window.location.reload()
    } else {
      useMessage('FAIL', '登录失败', 2000)
    }


  }

  return { userForm, handleLogin, handleRegister }
}

const { userForm, handleLogin, handleRegister } = useLogin()

</script>

<style scoped>
.input {
  @apply appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm;
}
</style>