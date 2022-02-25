<template>
  <div class="shadow-lg mb-4" v-show="visible">
    <div v-for="(comment, index) in comment_list" class="flex px-5 py-4">
      <img src="../../assets/images/static.jpg" class="w-8 h-8" />
      <div class="w-full ml-4 border-b-2">
        <span>{{ comment.holder.nickname }}</span>
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
          :rootCommentId="comment._id"
          :replyTo="comment.holder._id"
          :ref="(el) => setItemRef(el, index)"
        ></CommentInput>
        <ReplyList :questionId="questionId" :answerId="answerId" :rootCommentId="comment._id"></ReplyList>
      </div>
    </div>
    <div class="ml-5 mr-4">
      <CommentInput :questionId="questionId" :answerId="answerId" ref="commentInputRef"></CommentInput>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref, computed } from 'vue';
import ActionList from '../action-list/action-list.vue';
import CommentInput from './comment-input.vue';
import ReplyList from './reply-list.vue';
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
  }
})
const store = useStore()
const userInfo = computed(() => store.state.userInfo)

const visible = ref(false)
const show = () => {
  visible.value = true
}

const hide = () => {
  visible.value = false
}

const shiftVisible = () => {
  visible.value = !visible.value
}

defineExpose({
  show,
  hide,
  shiftVisible
})

const { comment_list, commentInputRef, setItemRef, commentHandle, fetchComments } = useComment()
fetchComments(props.questionId, props.answerId)

nextTick(() => {
  commentInputRef.value.shiftVisible()
})

const { thumbHandle } = useThumb()




</script>
<style scoped>
</style>

