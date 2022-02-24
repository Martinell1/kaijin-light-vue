<template>
  <div class="flex">
    <div class="tag" v-for="topic in question_detail.topics">{{ topic.name }}</div>
  </div>
  <h1 class="font-black text-3xl my-6 text-rose-500">{{ question_detail.title }}</h1>
  <MdEditor :previewOnly="true" :modelValue="question_detail.description" class="my-4"></MdEditor>
  <ContentFooter
    :voteCount="question_detail.voteCount"
    :voteActive="userInfo?.likingQuestions.includes(question_detail._id)"
    :viewCount="question_detail.viewCount"
    @thumbClick="thumbHandle(question_detail, 'Question')"
    :size="'text-xl'"
  ></ContentFooter>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import MdEditor from '../components/editor/md-editor.vue';
import { getQuestionDetail } from '@/api/question'
import { getAnswers } from '@/api/answer'
import ContentList from '../components/content-list/content-list.vue';
import ContentFooter from '../components/content-list/content-footer.vue';
import { useStore } from 'vuex';
import useThumb from '@/components/content-list/useThumb'
const route = useRoute()

const store = useStore()
const userInfo = computed(() => store.state.userInfo)


const useQuestion = () => {
  const question_detail = ref({})

  const fetchQuestions = async () => {
    const { data: result } = await getQuestionDetail(route.params.id)
    console.log(result);
    question_detail.value = result
  }

  const answer_list = ref([])

  const fetchAnswers = async () => {
    const { data: result } = await getAnswers(route.params.id)
    console.log(result);
    answer_list.value = [...answer_list.value, ...result]
  }

  return { question_detail, answer_list, fetchQuestions, fetchAnswers }
}

const { question_detail, answer_list, fetchQuestions, fetchAnswers } = useQuestion()
fetchQuestions()
fetchAnswers()


const { thumbHandle } = useThumb()
</script>
<style scoped>
.tag {
  @apply bg-rose-200 text-rose-500 text-lg px-3 leading-8 mr-4 rounded-full;
}
</style>