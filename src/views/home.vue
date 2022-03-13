<template>
  <div class="home-wrapper">
    <main>
      <div>热门问题</div>
      <ContentList :datas="hot_articles" :content_type="'Question'"></ContentList>
      <div>热门文章</div>
      <ContentList :datas="hot_questions" :content_type="'Article'"></ContentList>
    </main>
  </div>
</template>

<script setup>
import ContentList from '@/components/content-list/content-list.vue';
import useHots from '../components/home-aside/useHots';
const { hot_questions, hot_articles, fetchHotQuestions, fetchHotArticles } = useHots()
fetchHotQuestions()
fetchHotArticles()
</script>
<style scoped>
.home-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  width: 1400px;
  margin: auto;
}
</style>