<template>
  <div class="shadow-md bg-zinc-50 mt-4 px-5">
    <div v-for="(answer, index) in answer_list" :key="answer._id" class="pt-4 border-b-2">
      <div class="flex mb-4">
        <SuspendUserInfo :userInfo="answer.holder" :showAvatar="true"></SuspendUserInfo>
      </div>
      <PreviewEditor :modelValue="answer.content" :previewOnly="true"></PreviewEditor>
      <div class="mb-4 text-zinc-500">{{ new Date(answer.updatedAt).toDateString() }}</div>
      <div class="flex justify-between items-center">
        <ActionList
          :actionList="['voteCount', 'follow', 'comment']"
          :voteCount="answer.voteCount"
          :voteActive="userInfo?.likingAnswers.includes(answer._id)"
          :followActive="userInfo?.followingAnswers.includes(answer._id)"
          @thumbClick="thumbHandle(answer, 'Answer')"
          @followClick="followHandle(answer, 'Answer')"
          @commentClick="commentHandle(index)"
        ></ActionList>
        <div
          class="btn -mt-4 mr-4"
          v-if="answer.holder._id === userInfo._id"
          @click="editAnswerClick(answer)"
        >编辑回答</div>
      </div>

      <CommentList
        :ref="(el) => setInputRef(el, index)"
        :questionId="route.params.id"
        :answerId="answer._id"
      ></CommentList>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import PreviewEditor from '@/components/base/editor/preview-editor.vue';
import CommentList from '@/components/comment-list/comment-list.vue';
import ActionList from '@/components/base/action-list/action-list.vue';
import useThumb from '@/components/base/action-list/useThumb'
import useFollow from '@/components/base/action-list/useFollow'
import SuspendUserInfo from '@/components/base/suspend-userInfo/suspend-userInfo.vue'
import useComment from '../comment-list/useComment'
import useScroll from '../../hooks/useScroll';
defineProps({
  answer_list: {
    type: Array,
    default: []
  }
})
const route = useRoute()
const store = useStore()
const userInfo = computed(() => store.state.userInfo)

const { thumbHandle } = useThumb()
const { followHandle } = useFollow()

const { setInputRef, commentHandle } = useComment()

const emit = defineEmits(['editAnswerClick'])
const editAnswerClick = (answer) => {
  emit('editAnswerClick', answer)
}

</script>
<style  scoped>
</style>