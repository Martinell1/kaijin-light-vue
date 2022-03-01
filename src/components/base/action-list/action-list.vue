<template>
  <div class="pb-4 flex" :class="{ 'border-b-2': divide }, size">
    <div
      class="act-item"
      v-if="actionList.includes('follow')"
      :class="{ 'act-item-active': followActive }"
      @click="followClick"
    >
      <StarIcon class="act-item-icon"></StarIcon>
      <div class="act-item-text">关注</div>
    </div>

    <div class="act-item" v-if="actionList.includes('writeAnswer')" @click="writeAnswerClick">
      <PencilAltIcon class="act-item-icon"></PencilAltIcon>
      <div class="act-item-text">写回答</div>
    </div>

    <div
      class="act-item"
      v-if="actionList.includes('voteCount')"
      :class="{ 'act-item-active': voteActive }"
      @click="thumbClick"
    >
      <ThumbUpIcon class="act-item-icon"></ThumbUpIcon>
      <div class="act-item-text">点赞数{{ voteCount }}</div>
    </div>

    <div class="act-item" v-if="actionList.includes('viewCount')">
      <EyeIcon class="act-item-icon"></EyeIcon>
      <div class="act-item-text">浏览量{{ viewCount }}</div>
    </div>

    <div class="act-item" v-if="actionList.includes('comment')" @click="commentClick">
      <ChatAltIcon class="act-item-icon"></ChatAltIcon>
      <div class="act-item-text">评论</div>
    </div>

    <div class="act-item" v-if="actionList.includes('edit')" @click="editClick">
      <ChatAltIcon class="act-item-icon"></ChatAltIcon>
      <div class="act-item-text">编辑</div>
    </div>
  </div>
</template>

<script setup>
import { StarIcon, PencilAltIcon, ThumbUpIcon, ChatAltIcon, EyeIcon } from '@heroicons/vue/solid'
const props = defineProps({
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
  },
  followActive: {
    type: Boolean,
    default: false
  },
  actionList: {
    type: Array,
    default: []
  }
})

const emit = defineEmits(['thumbClick', 'followClick', 'writeAnswerClick', 'commentClick', 'editClick'])
const thumbClick = () => {
  console.log('点赞');
  emit('thumbClick')

}
const followClick = () => {
  emit('followClick')
}
const writeAnswerClick = () => {
  emit('writeAnswerClick')
}
const commentClick = () => {
  emit('commentClick')
}
const editClick = () => {
  emit('editClick')
}

</script>
<style scoped>
.act-item {
  @apply flex items-center text-stone-500 mr-6 cursor-pointer;
}

.act-item-active {
  @apply text-rose-500;
}

.act-item-icon {
  @apply h-5 w-5 mr-2;
}

.act-item-text {
  @apply leading-5;
}
</style>