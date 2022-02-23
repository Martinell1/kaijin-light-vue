<template>
  <div class="flex">
    <div class="tag" v-for="topic in question_detail.topics">{{ topic.name }}</div>
  </div>
  <h1 class="font-black text-3xl my-6 text-rose-500">{{ question_detail.title }}</h1>
  <MdEditor :previewOnly="true" :modelValue="question_detail.description"></MdEditor>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import MdEditor from '../components/md-editor/md-editor.vue';
import { getQuestionDetail } from '@/api/question'
const route = useRoute()
const useQuestion = () => {
  const question_detail = ref({})

  const fetchQuestion = async () => {
    const { data: result } = await getQuestionDetail(route.params.id)
    question_detail.value = result
    console.log(result);
  }

  return { question_detail, fetchQuestion }
}

const { question_detail, fetchQuestion } = useQuestion()
fetchQuestion()
</script>
<style scoped>
.tag {
  @apply bg-rose-200 text-rose-500 text-lg px-3 leading-8 mr-4 rounded-full;
}
</style>