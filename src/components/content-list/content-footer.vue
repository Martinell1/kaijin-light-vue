<template>
  <div class="pb-4 flex" :class="{ 'border-b-2': divide }, size">
    <div class="opt-item" :class="{ 'opt-item-active': voteActive }" @click="thumbClick">
      <ThumbUpIcon class="opt-item-icon"></ThumbUpIcon>
      <div class="opt-item-text">点赞数{{ voteCount }}</div>
    </div>
    <div class="opt-item">
      <EyeIcon class="opt-item-icon"></EyeIcon>
      <div class="opt-item-text">浏览量{{ viewCount }}</div>
    </div>
    <div class="opt-item">
      <ChatAltIcon class="opt-item-icon"></ChatAltIcon>
      <div class="opt-item-text">评论</div>
    </div>
  </div>
</template>

<script setup>
import { ThumbUpIcon, ChatAltIcon, EyeIcon } from '@heroicons/vue/solid'
defineProps({
  divide: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'text-lg'
  },
  voteCount: {
    type: Number,
    default: 0
  },
  voteActive: {
    type: Boolean,
    default: false
  },
  viewCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['thumbClick', 'comment'])
const thumbClick = () => {
  emit('thumbClick')
}
</script>
<style scoped>
.opt-item {
  @apply flex items-center text-stone-500 mr-6;
}

.opt-item-active {
  @apply text-rose-500;
}

.opt-item-icon {
  @apply h-5 w-5 mr-2;
}

.opt-item-text {
  @apply leading-5;
}
</style>