<template>
  <div class="main-wrapper pb-14">
    <img src="../assets/images/static.jpg" />
    <h1 class="font-black text-3xl my-6 text-rose-500">{{ article_detail.title }}</h1>
    <div class="flex justify-between mb-6">
      <div class="flex items-center">
        <img src="../assets/images/static.jpg" class="w-10 h-10 rounded-full" />
        <span class="ml-4 text-lg font-bold">{{ article_detail.holder?.nickname }}</span>
      </div>
      <div class="btn mr-4" @click="followHandle(article_detail.holder, '')">
        <span v-show="userInfo?.followings.includes(article_detail.holder?._id)">已关注</span>
        <span v-show="!userInfo?.followings.includes(article_detail.holder?._id)">关注</span>
      </div>
    </div>
    <PreviewEditor :previewOnly="true" :modelValue="article_detail.content"></PreviewEditor>
    <div class="flex mt-4">
      <div class="tag" v-for="topic in article_detail.topics">{{ topic.name }}</div>
    </div>
    <TalkList :articleId="article_detail._id"></TalkList>
  </div>
  <ArticleFooter :article_detail="article_detail"></ArticleFooter>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import PreviewEditor from '@/components/editor/preview-editor.vue';
import { getArticleDetail } from '@/api/article'
import ArticleFooter from '@/components/article-footer/article-footer.vue';
import useFollow from '@/components/action-list/useFollow'
import TalkList from '@/components/talk-list/talk-list.vue';

const route = useRoute()
const useArticleDetail = () => {
  const article_detail = ref({})

  const fetchArticleDetail = async () => {
    const { data: result } = await getArticleDetail(route.params.id)
    article_detail.value = result
  }

  return { article_detail, fetchArticleDetail }
}

const { article_detail, fetchArticleDetail } = useArticleDetail()
fetchArticleDetail()

const { followHandle } = useFollow()
const store = useStore()
const userInfo = computed(() => store.state.userInfo)

</script>
<style scoped>
</style>