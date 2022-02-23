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
        <div class="flex">
          <router-link :to="{ name: 'Login' }">
            <div class="btn">Login</div>
          </router-link>

          <div class="btn">Register</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
<style scoped>
.nav {
  @apply text-center text-rose-500 font-semibold text-xl w-28 h-10 leading-10 cursor-pointer;
}
</style>