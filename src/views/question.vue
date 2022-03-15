<template>
  <main>
    <div class="w-full h-[150px]">
      <img src="../assets/images/question.png" class="w-full h-full rounded object-cover" />
    </div>
    <h2 class="text-stone-500 text-xl font-semibold my-2">问题区</h2>
    <ContentList :datas="question_list" :fetchFn="fetchQuestions"></ContentList>
  </main>
</template>

<script setup>
import ContentList from '../components/content-list/content-list.vue';
import useQuestion from '@/hooks/useQuestion';

const { question_list, fetchQuestions } = useQuestion()
fetchQuestions(10)
</script>
<style scoped>
</style>