<template>
  <div class="pb-4 flex" :class="{ 'border-b-2': divide }, size">
    <div class="opt-item" @click="thumbHandle">
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
  }
})

const emit = defineEmits(['thumbHandle', 'comment'])
const thumbHandle = () => {
  emit('thumbHandle')
}
</script>
<style  scoped>
.opt-item {
  @apply flex items-center text-stone-500 mr-6;
}

.opt-item-icon {
  @apply h-5 w-5 mr-2;
}
</style>