<template>
  <div v-for="(comment, index) in comment_list" class="flex pt-4 pb-2">
    <img src="../../assets/images/static.jpg" class="w-8 h-8" />
    <div class="w-full ml-4">
      <span>{{ comment.holder.nickname }}回复{{ comment.replyTo.nickname }}</span>
      <div class="my-2">{{ comment.content }}</div>
      <ActionList
        :actionList="['voteCount', 'comment']"
        :voteCount="comment.voteCount"
        :voteActive="userInfo?.likingComments.includes(comment._id)"
        @thumbClick="thumbHandle(comment, 'Comment')"
        @commentClick="commentHandle(index)"
      ></ActionList>
      <CommentInput
        :questionId="questionId"
        :answerId="answerId"
        :rootCommentId="rootCommentId"
        :replyTo="comment.holder._id"
        :ref="(el) => setItemRef(el, index)"
      ></CommentInput>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ActionList from '../action-list/action-list.vue';
import CommentInput from './comment-input.vue';
import useComment from '../comment-list/useComment'
import useThumb from '@/components/action-list/useThumb'
import { useStore } from 'vuex';
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

const { comment_list, setItemRef, commentHandle, fetchComments } = useComment()
fetchComments(props.questionId, props.answerId, props.rootCommentId)

const { thumbHandle } = useThumb()
</script>
<style scoped>
</style>