<template>
  <div class="main-wrapper">
    <ContentList :datas="question_list" :fetchFn="fetchQuestions"></ContentList>
  </div>
</template>

<script setup>
import ContentList from '../components/content-list/content-list.vue';
import useQuestion from '@/hooks/useQuestion';

const { question_list, fetchQuestions } = useQuestion()
fetchQuestions(10)
</script>
<style lang='scss' scoped>
</style>