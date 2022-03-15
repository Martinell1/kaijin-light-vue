<template>
  <main>
    <div class="w-full h-[150px]">
      <img src="../assets/images/article.jpg" class="w-full h-full rounded object-cover" />
    </div>
    <h2 class="text-stone-500 text-xl font-semibold my-2">文章区</h2>
    <ContentList :datas="article_list" :content_type="'Article'" :fetchFn="fetchArticles"></ContentList>
  </main>
</template>

<script setup>
import ContentList from '@/components/content-list/content-list.vue';
import useArticle from '@/hooks/useArticle';

const { article_list, fetchArticles } = useArticle()
fetchArticles()
</script>
<style lang='scss' scoped>
</style>