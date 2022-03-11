<template>
  <div class="main-wrapper pb-14">
    <img :src="article_detail.holder.avatar_url" />
    <h1 class="font-black text-3xl my-6 text-rose-500">{{ article_detail.title }}</h1>
    <div class="flex justify-between mb-6">
      <div class="flex items-center">
        <SuspendUserInfo :userInfo="article_detail.holder" :showAvatar="true"></SuspendUserInfo>
      </div>
      <div
        v-if="userInfo && article_detail.holder?._id !== userInfo._id"
        class="btn mr-4"
        @click="followHandle(article_detail.holder, '')"
      >
        <span v-show="userInfo?.followings.includes(article_detail.holder?._id)">已关注</span>
        <span v-show="!userInfo?.followings.includes(article_detail.holder?._id)">关注</span>
      </div>
    </div>
    <PreviewEditor :previewOnly="true" :modelValue="article_detail.content"></PreviewEditor>
    <TopicList :topics="article_detail.topics" :tag="true" class="my-5"></TopicList>
    <TalkList :articleId="article_detail._id"></TalkList>
  </div>
  <ArticleFooter :article_detail="article_detail"></ArticleFooter>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import PreviewEditor from '@/components/base/editor/preview-editor.vue';
import ArticleFooter from '@/components/article-footer/article-footer.vue';
import TalkList from '@/components/talk-list/talk-list.vue';
import SuspendUserInfo from '@/components/base/suspend-userInfo/suspend-userInfo.vue'
import TopicList from '@/components/topic-list/topic-list.vue';
import useFollow from '@/components/base/action-list/useFollow'
import useArticle from '@/hooks/useArticle';

const route = useRoute()

const { article_detail, fetchArticleDetail } = useArticle()
fetchArticleDetail(route.params.id)

const { followHandle } = useFollow()
const store = useStore()
const userInfo = computed(() => store.state.userInfo)

</script>
<style scoped>
</style>