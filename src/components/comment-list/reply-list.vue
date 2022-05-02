<template>
  <div v-for="comment in comment_list" :key="comment._id" class="flex flex-col pt-4 pb-2 border-t-2">
    <div class="flex justify-between">
      <div class="flex items-center">
        <SuspendUserInfo :userInfo="comment.holder" :rounded="''"></SuspendUserInfo>
        <span class="support-text mx-2">回复</span>
        <SuspendUserInfo :userInfo="comment.holder" :showAvatar="false"></SuspendUserInfo>
      </div>
      <span class="support-text">{{ useTimeAgo(comment.updatedAt).value }}</span>
    </div>
    <div class="w-full pl-14">
      <div class="my-2 text-lg text-stone-700">{{ comment.content }}</div>
      <ActionList :actionList="['voteCount', 'comment']" :voteCount="comment.voteCount"
        :voteActive="userInfo?.likingComments.includes(comment._id)" @thumbClick="thumbHandle(comment, 'Comment')"
        @commentClick="commentHandle(comment._id)"></ActionList>
      <CommentInput :questionId="questionId" :answerId="answerId" :rootCommentId="rootCommentId"
        :replyTo="comment.holder._id" :ref="(el) => setInputRef(el, comment._id)" @refresh="refresh"></CommentInput>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex';
import { useTimeAgo } from '@vueuse/core'
import CommentInput from './comment-input.vue';
import useComment from '../comment-list/useComment'
import ActionList from '@/components/base/action-list/action-list.vue';
import useThumb from '@/components/base/action-list/useThumb'
import SuspendUserInfo from '@/components/base/suspend-userInfo/suspend-userInfo.vue'
const props = defineProps({
  questionId: {
    type: String,
    default: ''
  },
  answerId: {
    type: String,
    default: ''
  },
  rootCommentId: {
    type: String,
    default: ''
  }
})
const store = useStore()
const userInfo = computed(() => store.state.userInfo)

const { comment_list, setInputRef, commentHandle, fetchComments } = useComment()
fetchComments(props.questionId, props.answerId, props.rootCommentId)
const { thumbHandle } = useThumb()

const refresh = () => {
  fetchComments(props.questionId, props.answerId, props.rootCommentId)
}

defineExpose({
  refresh
})
</script>
<style scoped>
</style>