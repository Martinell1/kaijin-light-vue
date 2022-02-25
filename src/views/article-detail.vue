<template>
  <img src="../assets/images/static.jpg" />
  <h1 class="font-black text-3xl my-6 text-rose-500">{{ article_detail.title }}</h1>
  <div class="flex justify-between mb-6">
    <div class="flex items-center">
      <img src="../assets/images/static.jpg" class="w-10 h-10 rounded-full" />
      <span class="ml-4 text-lg font-bold">{{ article_detail.holder?.nickname }}</span>
    </div>
    <div class="btn">关注</div>
  </div>
  <PreviewEditor :previewOnly="true" :modelValue="article_detail.content"></PreviewEditor>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import PreviewEditor from '../components/editor/preview-editor.vue';
import { getArticleDetail } from '@/api/article'
const route = useRoute()
const useArticleDetail = () => {
  const article_detail = ref({})

  const fetchArticleDetail = async () => {
    const { data: result } = await getArticleDetail(route.params.id)
    article_detail.value = result
    console.log(result);
  }

  return { article_detail, fetchArticleDetail }
}

const { article_detail, fetchArticleDetail } = useArticleDetail()
fetchArticleDetail()
</script>
<style scoped>
</style>