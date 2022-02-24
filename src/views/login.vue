<template>
  <div class="w-[500px] p-5 bg-zinc-50">
    <form class="mt-8 space-y-6">
      <div class="rounded-md shadow-sm space-y-4">
        <div>
          <label for="account" class="sr-only">Account</label>
          <input
            v-model="loginForm.account"
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
            v-model="loginForm.password"
            id="password"
            type="password"
            autocomplete="current-password"
            required
            class="input"
            placeholder="Password"
          />
        </div>
      </div>

      <div>
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
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { LockClosedIcon } from '@heroicons/vue/solid'
import { login, getUserDetail } from '@/api/user'
const store = useStore()

const emit = defineEmits(['hide'])
const useLogin = () => {
  const loginForm = reactive({
    account: '',
    password: ''
  })

  const handleLogin = async () => {
    const { data: { id, token } } = await login(loginForm)
    localStorage.setItem("token", token)
    const params = "locations;education;employments;following;followingTopics;followingArticles;followingQuestions;followingAnswers;likingAnswers;dislikingAnswers;likingQuestions;likingArticles;likingComments;dislikingComments;likingTalks;dislikingTalks"
    const { data: result } = await getUserDetail(id, params)
    store.dispatch('setUserInfo', result)
    localStorage.setItem("userInfo", JSON.stringify(result))
    emit('hide')

    console.log(JSON.parse(localStorage.getItem("userInfo")));
  }

  return { loginForm, handleLogin }
}

const { loginForm, handleLogin } = useLogin()
</script>

<style scoped>
.input {
  @apply appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm;
}
</style>