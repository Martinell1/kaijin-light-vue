<template>
  <ContentList :datas="article_list" :title_type="'Article'"></ContentList>
</template>

<script setup>
import { ref } from 'vue';
import ContentList from '../components/content-list/content-list.vue';
import { getArticles } from '@/api/article'

const useArticle = () => {
  const article_list = ref([])

  const fetchArticles = async (per_page, page) => {
    const { data: result } = await getArticles(per_page, page)
    article_list.value = [...article_list.value, ...result]
  }

  return { article_list, fetchArticles }
}

const { article_list, fetchArticles } = useArticle()
fetchArticles(10, 1)
</script>
<style lang='scss' scoped>
</style>