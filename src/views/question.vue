<template>
  <ContentList :datas="question_list"></ContentList>
</template>

<script setup>
import { ref } from 'vue';
import ContentList from '../components/content-list/content-list.vue';
import { getQuestions } from '@/api/question'

const useQuestion = () => {
  const question_list = ref([])

  const fetchQuestions = async (per_page, page) => {
    const { data: result } = await getQuestions(per_page, page)
    question_list.value = [...question_list.value, ...result]
  }

  return { question_list, fetchQuestions }
}

const { question_list, fetchQuestions } = useQuestion()
fetchQuestions(10, 1)
</script>
<style lang='scss' scoped>
</style>