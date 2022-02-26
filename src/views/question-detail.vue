<template>
  <div class="question-detail-wrappper">
    <div class="main-wrapper">
      <div class="flex">
        <div class="tag" v-for="topic in question_detail.topics">{{ topic.name }}</div>
      </div>
      <h1 class="font-black text-3xl my-6 text-rose-500">{{ question_detail.title }}</h1>
      <PreviewEditor :modelValue="question_detail.description" class="my-4"></PreviewEditor>
      <ActionList
        :voteCount="question_detail.voteCount"
        :voteActive="userInfo?.likingQuestions.includes(question_detail._id)"
        :followActive="userInfo?.followingQuestions.includes(question_detail._id)"
        :viewCount="question_detail.viewCount"
        :actionList="['follow', 'writeAnswer', 'voteCount', 'viewCount']"
        :size="'text-xl'"
        @thumbClick="thumbHandle(question_detail, 'Question')"
        @followClick="followHandle(question_detail, 'Question')"
        @writeAnswerClick="writeAnswerHandle"
      ></ActionList>
    </div>
  </div>
  <div class="main-wrapper">
    <Editor ref="editorRef" @refresh="refresh"></Editor>
    <AnswerList :answer_list="answer_list" @editAnswerClick="editAnswerHandle"></AnswerList>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import PreviewEditor from '@/components/editor/preview-editor.vue';
import { getQuestionDetail } from '@/api/question'
import { getAnswers } from '@/api/answer'
import { useStore } from 'vuex';
import Editor from '@/components/editor/editor.vue'
import AnswerList from '@/components/answer-list/answer-list.vue';
import ActionList from '@/components/action-list/action-list.vue';
import useThumb from '@/components/action-list/useThumb'
import useFollow from '@/components/action-list/useFollow'
const route = useRoute()

const store = useStore()
const userInfo = computed(() => store.state.userInfo)


const useQuestion = () => {
  const question_detail = ref({})

  const fetchQuestions = async () => {
    const { data: result } = await getQuestionDetail(route.params.id)
    question_detail.value = result
  }

  const answer_list = ref([])

  const fetchAnswers = async () => {
    const { data: result } = await getAnswers(route.params.id)
    answer_list.value = [...answer_list.value, ...result]
  }

  return { question_detail, answer_list, fetchQuestions, fetchAnswers }
}

const { question_detail, answer_list, fetchQuestions, fetchAnswers } = useQuestion()
fetchQuestions()
fetchAnswers()


const { thumbHandle } = useThumb()

const { followHandle } = useFollow()

const editorRef = ref(null)
const writeAnswerHandle = () => {
  editorRef.value.shiftVisible()
}

const editAnswerHandle = (answer) => {
  editorRef.value.id = answer._id
  editorRef.value.content = answer.content
  editorRef.value.show()
}

const refresh = () => {
  answer_list.value = []
  fetchAnswers()
}

</script>
<style scoped>
.question-detail-wrappper {
  @apply -mt-4 pt-5 bg-zinc-50 shadow;
}
</style>