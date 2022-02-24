<template>
  <div class="flex">
    <div class="tag" v-for="topic in question_detail.topics">{{ topic.name }}</div>
  </div>
  <h1 class="font-black text-3xl my-6 text-rose-500">{{ question_detail.title }}</h1>
  <MdEditor :previewOnly="true" :modelValue="question_detail.description" class="my-4"></MdEditor>
  <ContentFooter :size="'text-xl'"></ContentFooter>

  <!-- <ContentList :datas="answer_list" :title_type="'User'"></ContentList> -->
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import MdEditor from '../components/editor/md-editor.vue';
import { getQuestionDetail } from '@/api/question'
import { getAnswers } from '@/api/answer'
import ContentList from '../components/content-list/content-list.vue';
import ContentFooter from '../components/content-list/content-footer.vue';
const route = useRoute()
const useQuestion = () => {
  const question_detail = ref({})

  const fetchQuestions = async () => {
    const { data: result } = await getQuestionDetail(route.params.id)
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
</script>
<style scoped>
.tag {
  @apply bg-rose-200 text-rose-500 text-lg px-3 leading-8 mr-4 rounded-full;
}
</style>