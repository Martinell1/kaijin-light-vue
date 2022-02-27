<template>
  <div class="flex shadow mt-4 border px-2">
    <router-link :to="{ name: 'Moment', params: { channel: 'question' } }">
      <div class="nav-item">问题</div>
    </router-link>
    <router-link :to="{ name: 'Moment', params: { channel: 'answer' } }">
      <div class="nav-item">回答</div>
    </router-link>
    <router-link :to="{ name: 'Moment', params: { channel: 'article' } }">
      <div class="nav-item">文章</div>
    </router-link>
    <router-link :to="{ name: 'Moment', params: { channel: 'following' } }">
      <div class="nav-item">关注</div>
    </router-link>
    <router-link :to="{ name: 'Moment', params: { channel: 'follower' } }">
      <div class="nav-item">粉丝</div>
    </router-link>
  </div>
</template>

<script setup>

</script>
<style  scoped>
.nav-item {
  @apply text-xl px-4 py-2 text-stone-700;
}
</style>