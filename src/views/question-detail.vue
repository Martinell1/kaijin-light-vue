<template>
  <div class="absolute left-0 right-0 -z-10">
    <div class="bg-zinc-50 shadow">
      <div class="main-wrapper">
        <TopicList :topics="question_detail.topics" class="pt-4"></TopicList>
        <h1 class="font-black text-3xl my-6 text-rose-500">{{ question_detail.title }}</h1>
        <div class="flex">
          <PreviewEditor :content="question_detail.description" class="my-4"></PreviewEditor>
        </div>
        <ActionList
          :voteCount="question_detail.voteCount"
          :voteActive="userInfo?.likingQuestions?.includes(question_detail._id)"
          :followActive="userInfo?.followingQuestions?.includes(question_detail._id)"
          :viewCount="question_detail.viewCount"
          :actionList="['follow', 'writeAnswer', 'voteCount', 'viewCount']"
          :size="'text-lg'"
          @thumbClick="thumbHandle(question_detail, 'Question')"
          @followClick="followHandle(question_detail, 'Question')"
          @writeAnswerClick="writeAnswerHandle"
        ></ActionList>
      </div>
    </div>

    <div class="main-wrapper" ref="wrapper">
      <Editor ref="editorRef" @refresh="refresh"></Editor>
      <AnswerList ref="scrollRef" :answer_list="answer_list" @editAnswerClick="editAnswerHandle"></AnswerList>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import AnswerList from '@/components/answer-list/answer-list.vue';
import PreviewEditor from '@/components/base/editor/preview-editor.vue';
import Editor from '@/components/base/editor/editor.vue'
import ActionList from '@/components/base/action-list/action-list.vue';
import TopicList from '@/components/topic-list/topic-list.vue';
import useThumb from '@/components/base/action-list/useThumb'
import useFollow from '@/components/base/action-list/useFollow'
import useQuestion from '@/hooks/useQuestion';
import useScroll from '../hooks/useScroll';


const route = useRoute()

const store = useStore()
const userInfo = computed(() => store.state.userInfo)


const { question_detail, answer_list, fetchQuestionDetail, fetchAnswers, setAnswerPage } = useQuestion()
fetchQuestionDetail(route.params.id)
fetchAnswers(route.params.id)


const { thumbHandle } = useThumb()

const { followHandle } = useFollow()

const editorRef = ref(null)
const writeAnswerHandle = () => {
  editorRef.value.id = ''
  editorRef.value.content = ''
  editorRef.value.shiftVisible()
}

const editAnswerHandle = (answer) => {
  editorRef.value.id = answer._id
  editorRef.value.content = answer.content
  editorRef.value.show()
}

const refresh = () => {
  answer_list.value = []
  setAnswerPage()
  fetchAnswers(route.params.id)
}

const wrapper = ref(null)
watch(wrapper, () => {
  wrapper.value.children[0].children[0].setAttribute('id', 'answer-id')
})


const scrollRef = ref(null)
useScroll(scrollRef, fetchAnswers, route.params.id)

</script>
<style scoped>
</style>