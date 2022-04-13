<template>
  <div class="main-wrapper">
    <div class="flex items-center mb-4 text-stone-500 cursor-pointer">
      <span
        class="mr-4"
        @click="searchTypeHandle('question')"
        :class="{ 'text-rose-500': type === 'question' }"
      >问题</span>
      <span
        class="mr-4"
        :class="{ 'text-rose-500': type === 'article' }"
        @click="searchTypeHandle('article')"
      >文章</span>
      <span
        class="mr-4"
        :class="{ 'text-rose-500': type === 'news' }"
        @click="searchTypeHandle('news')"
      >资讯</span>
      <span
        class="mr-4"
        :class="{ 'text-rose-500': type === 'resource' }"
        @click="searchTypeHandle('resource')"
      >资源</span>
      <span
        class="mr-4"
        @click="searchTypeHandle('user')"
        :class="{ 'text-rose-500': type === 'user' }"
      >用户</span>
      <span @click="searchTypeHandle('topic')" :class="{ 'text-rose-500': type === 'topic' }">标签</span>
    </div>
    <ContentList v-if="['question', 'article'].includes(type)" :datas="data_list" :content_type="type[0].toUpperCase()+type.slice(1)"></ContentList>
    <NewsList v-if="type === 'news'" :datas="data_list"></NewsList>
    <ResourceList v-if="type === 'resource'" :datas="data_list"></ResourceList>
    <div v-if="type === 'user'">
      <div v-for="user in data_list" class="shadow border px-5 py-4">
        <router-link :to="{ name: 'UserDetail', params: { id: user._id } }">
          <SuspendUserInfo :userInfo="user"></SuspendUserInfo>
        </router-link>
      </div>
    </div>
    <div v-if="type === 'topic'" class="flex space-x-8">
      <div
        v-for="topic in data_list"
        @click="searchTopicHandle(topic._id)"
        class="flex flex-col justify-center items-center w-32 border shadow-sm px-4 py-5 hover:border-rose-200 cursor-pointer"
      >
        <img :src="topic.avatar_url" width="68" height="68" />
        <div class="mt-4">{{ topic.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import ContentList from '../components/content-list/content-list.vue';
import SuspendUserInfo from '../components/base/suspend-userInfo/suspend-userInfo.vue'
import useArticle from '../hooks/useArticle';
import useQuestion from '../hooks/useQuestion';
import useUser from '../hooks/useUser'
import useTopic from '../hooks/useTopic'
import NewsList from '../components/news-list/news-list.vue';
import useNews from '../hooks/useNews';
import useResource from '../hooks/useResource';
import ResourceList from '../components/resource-list/resource-list.vue';

const route = useRoute()
const key = ref(route.params.key)
const { question_list, setQuestionPage, fetchQuestions } = useQuestion()
const { article_list, setArticlePage, fetchArticles } = useArticle()
const { user_list, setUserPage, fetchUsers } = useUser()
const { topic_list, fetchTopics } = useTopic()
const { news_list, setNewsPage, fetchNewss } = useNews()
const { resource_list, setResourcePage, fetchResources } = useResource()

const useSearch = () => {
  const data_list = ref([])

  const searchQuestion = async () => {
    await fetchQuestions(10, key.value)
    data_list.value = question_list.value
  }

  const searchArticle = async () => {
    await fetchArticles(10, key.value)
    data_list.value = article_list.value
  }

  const searchNews = async () => {

    await fetchNewss(10, key.value)
    data_list.value = news_list.value
  }

  const searchUser = async () => {
    await fetchUsers(10, key.value)
    data_list.value = user_list.value
  }

  const searchTopic = async () => {
    await fetchTopics(key.value)
    data_list.value = topic_list.value
  }

  const searchResource = async () => {
    await fetchResources(10, key.value)
    data_list.value = resource_list.value
  }

  return { data_list, searchQuestion, searchArticle, searchUser, searchTopic, searchNews, searchResource }
}

const { data_list, searchQuestion, searchArticle, searchUser, searchTopic, searchNews, searchResource } = useSearch()

const initData = () => {
  data_list.value = []
  question_list.value = []
  article_list.value = []
  user_list.value = []
}

const type = ref('question')

watch(type, (newType) => {
  initData()
  if (newType === 'question') {
    setQuestionPage()
    searchQuestion()
  } else if (newType === 'article') {
    setArticlePage()
    searchArticle()
  } else if (newType === 'user') {
    setUserPage()
    searchUser()
  } else if (newType === 'topic') {
    searchTopic()
  } else if (newType === 'news') {
    setNewsPage()
    searchNews()
  } else if (newType === 'resource') {
    setResourcePage()
    searchResource()
  }
}, { immediate: true })

watch(() => route.params.key, (newKey) => {
  key.value = newKey
  initData()
  setQuestionPage()
  type.value = 'question'
  searchQuestion()
})

const searchTypeHandle = (newType) => {
  type.value = newType
}

const router = useRouter()
const searchTopicHandle = (id) => {
  router.push({
    name: 'Search',
    params: {
      key: id
    }
  })
}

</script>
<style scoped>
</style>