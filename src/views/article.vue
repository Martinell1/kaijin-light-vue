<template>
  <div class="main-wrapper">
    <ContentList :datas="article_list" :content_type="'Article'" :fetchFn="fetchArticles"></ContentList>
  </div>
</template>

<script setup>
import ContentList from '@/components/content-list/content-list.vue';
import useArticle from '@/hooks/useArticle';

const { article_list, fetchArticles } = useArticle()
fetchArticles()
</script>
<style lang='scss' scoped>
</style>