<template>
  <div class="shadow-lg mb-4" v-show="visible">
    <div v-for="(comment, index) in comment_list" :key="comment._id" class="flex px-5 py-4">
      <SuspendUserInfo :userInfo="comment.holder" :showText="false" :rounded="''"></SuspendUserInfo>
      <div class="w-full border-b-2">
        <div class="flex justify-between">
          <SuspendUserInfo :userInfo="comment.holder" :showAvatar="false"></SuspendUserInfo>
          <span class="support-text">{{ useTimeAgo(comment.updatedAt).value }}</span>
        </div>
        <div class="my-2 text-lg text-stone-700">{{ comment.content }}</div>
        <ActionList :actionList="['voteCount', 'comment']" :voteCount="comment.voteCount"
          :voteActive="userInfo?.likingComments.includes(comment._id)" @thumbClick="thumbHandle(comment, 'Comment')"
          @commentClick="commentHandle(comment._id)"></ActionList>
        <CommentInput :questionId="questionId" :answerId="answerId" :rootCommentId="comment._id"
          @refresh="refresh2(index)" :replyTo="comment.holder._id" :ref="(el) => setInputRef(el, comment._id)">
        </CommentInput>
        <ReplyList :questionId="questionId" :answerId="answerId" :rootCommentId="comment._id"
          :ref="(el) => setReplyRef(el, index)"></ReplyList>
      </div>
    </div>
    <div class="ml-5 mr-4">
      <CommentInput @refresh="refresh1" :questionId="questionId" :answerId="answerId" ref="commentInputRef">
      </CommentInput>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useTimeAgo } from '@vueuse/core'
import CommentInput from './comment-input.vue';
import ReplyList from './reply-list.vue';
import ActionList from '@/components/base/action-list/action-list.vue';
import useComment from '@/components/comment-list/useComment'
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

const { comment_list, commentInputRef, replyRefs, setInputRef, setReplyRef, commentHandle, fetchComments, } = useComment()
fetchComments(props.questionId, props.answerId)

nextTick(() => {
  commentInputRef.value.shiftVisible()
})

const { thumbHandle } = useThumb()

const refresh1 = () => {
  fetchComments(props.questionId, props.answerId)
}

const refresh2 = (index) => {
  replyRefs[index].refresh()
}

</script>
<style scoped>
</style>

