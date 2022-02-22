<template>
  <div class="w-full h-[3.75rem] bg-slate-50 shadow">
    <div class="flex justify-between items-center h-full xl:mx-[25rem]">
      <div class="flex">
        <div class="nav">Question</div>
        <div class="nav">Article</div>
      </div>
      <div class="flex">
        <div class="flex mr-10">
          <input class="bg-zinc-50 w-80 outline-rose-300 pl-4" type="text" />
          <div class="btn">Search</div>
        </div>
        <div class="flex">
          <div class="btn">Login</div>
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
.btn {
  @apply text-center text-white font-semibold bg-rose-500 ring-rose-300 ring-inset ring-4 rounded-lg w-28 h-10 leading-10 mx-2 cursor-pointer;
}
</style>