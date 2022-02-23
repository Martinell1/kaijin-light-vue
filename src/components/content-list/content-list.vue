<template>
  <div class="content-list-wrapper mt-4 shadow rounded">
    <div v-for="item in datas" :key="item.id" class="pt-4 px-6">
      <div class="flex justify-between mb-3 font-black text-xl text-stone-500">
        <div>{{ item.holder.nickname }}</div>
        <div class="flex">
          <div class="topic-item" v-for="topic in item.topics" :key="topic.id">{{ topic.name }}</div>
        </div>
      </div>

      <h2 class="font-black text-xl text-rose-500">{{ item.title }}</h2>

      <div class="flex justify-between mt-3">
        <div class="text-lg text-stone-500 mb-2">{{ item.description }}</div>
        <img
          v-if="item.avatar_url"
          src="../../assets/images/static.jpg"
          width="190"
          height="105"
          class="ml-4"
        />
      </div>

      <div class="pb-4 border-b-2 flex">
        <div class="opt-item">
          <ThumbUpIcon class="opt-item-icon"></ThumbUpIcon>
          <div class="opt-item-text">点赞数</div>
        </div>
        <div class="opt-item">
          <EyeIcon class="opt-item-icon"></EyeIcon>
          <div class="opt-item-text">浏览量</div>
        </div>
        <div class="opt-item">
          <ChatAltIcon class="opt-item-icon"></ChatAltIcon>
          <div class="opt-item-text">评论</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ThumbUpIcon, ChatAltIcon, EyeIcon } from '@heroicons/vue/solid'
defineProps({
  datas: {
    type: Array,
    default: []
  }
})
</script>
<style scoped>
.content-list-wrapper {
  width: 700px;
}

.topic-item {
  @apply ml-3;
}

.opt-item {
  @apply flex items-center text-stone-500 mr-6;
}

.opt-item-icon {
  @apply h-5 w-5 mr-2;
}
.opt-item-text {
  @apply text-lg;
}
</style>