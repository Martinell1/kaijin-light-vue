<template>
  <div class="shadow-md bg-zinc-50 mt-4 px-5">
    <div v-for="(answer, index) in answer_list" :key="answer._id" class="pt-4 border-b-2">
      <div class="flex mb-4">
        <img src="../../assets/images/static.jpg" class="w-12 h-12 object-cover" />
        <div class="flex flex-col ml-4">
          <span class="font-bold">{{ answer.holder.nickname }}</span>
          <span>{{ answer.holder.headline }}</span>
        </div>
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
        <div class="btn -mt-4 mr-4" v-if="answer.holder._id === userInfo._id">编辑回答</div>
      </div>

      <CommentList
        :ref="(el) => setItemRef(el, index)"
        :questionId="route.params.id"
        :answerId="answer._id"
      ></CommentList>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PreviewEditor from '../editor/preview-editor.vue';
import ActionList from '@/components/action-list/action-list.vue';
import { useStore } from 'vuex';
import useThumb from '@/components/action-list/useThumb'
import useFollow from '@/components/action-list/useFollow'
import CommentList from '../comment-list/comment-list.vue';
import { useRoute } from 'vue-router';
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

const commentsRefs = []
const setItemRef = (el, index) => {
  if (el) {
    commentsRefs.push(el)
  }
}
const commentHandle = (index) => {
  commentsRefs[index].shiftVisible()
}



</script>
<style  scoped>
</style>