<template>
  <div class="home-wrapper">
    <header class="transition-all">
      <div class="flex bg-zinc-100 p-5 pb-0 shadow overflow-hidden hover:flex-wrap">
        <router-link
          class="mr-8 mb-4"
          v-for="topic in topic_list"
          :key="topic._id"
          :to="{ name: 'Search', params: { key: topic._id } }"
        >{{ topic.name }}</router-link>
      </div>
    </header>
    <main>
      <section class="w-[1200px] mx-auto">
        <div class="swiper-wrapper">
          <carousel :items-to-show="1" :wrapAround="true" :transition="2000" :autoplay="5000">
            <slide v-for="swiper in swipers" :key="swiper._id">
              <div class="relative">
                <h2
                  class="text-stone-200 text-4xl font-semibold absolute top-1/2 left-1/2 -translate-x-1/2"
                >{{ swiper.title }}</h2>
                <a :href="swiper.url">
                  <img :src="swiper.avatar_url" class="w-[1200px] h-[500px] object-cover rounded" />
                </a>
              </div>
            </slide>

            <template #addons>
              <navigation />
              <pagination />
            </template>
          </carousel>
        </div>
      </section>
      <section class="w-[1200px] mx-auto flex">
        <div>
          <div class="flex border-b ml-5">
            <div v-if="userInfo" class="nav" @click="handleType('follow')">关注</div>
            <div class="nav" @click="handleType('news')">热点资讯</div>
            <div class="nav" @click="handleType('hot')">热点问题</div>
            <div class="nav" @click="handleType('recommand')">小编推荐</div>
          </div>
          <div class="mt-4">
            <ContentList
              v-if="['hot', 'follow', 'recommand'].includes(type)"
              :datas="data"
              :content_type="activeType"
            ></ContentList>
            <NewsList v-if="type === 'news'" :datas="data" :content_type="activeType"></NewsList>
          </div>
        </div>
        <div class="flex flex-col w-full ml-10">
          <div class="text-stone-500 leading-[4rem]">下载专区</div>
          <div class="shadow border w-full px-5 py-4">
            <ul v-for="(resource, index) in hot_resources">
              <li @click="download(resource._id)">
                <a :href="resource.url" download target="_blank" class="flex relative my-2">
                  <span class="inline-block w-4 text-center mr-4 font-semibold">{{ index + 1 }}</span>
                  <div class="w-[150px] truncate">{{ resource.title }}</div>
                  <span
                    class="inline-block w-7 h-7 bg-stone-200 rounded text-center leading-7 absolute right-0"
                  >{{ resource.downloadCount }}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="text-stone-500 leading-[4rem]">友情链接</div>
          <div class="shadow border w-full px-5 py-4">
            <ul v-for="link in links">
              <li class="flex my-2 text-stone-500 items-center">
                <div class="w-8 h-8 mr-4">
                  <img :src="link.avatar_url" class="w-full h-full rounded" />
                </div>
                <a :href="link.url">{{ link.title }}</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import ContentList from '@/components/content-list/content-list.vue';
import useHots from '../components/home-aside/useHots';
import useTopics from '../hooks/useTopic'
import axios from '@/api/axios';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import useArticle from '../hooks/useArticle';
import useNews from '../hooks/useNews'
import useResource from '../hooks/useResource';
import { useStore } from 'vuex';
import NewsList from '../components/news-list/news-list.vue';

const store = useStore()
const { hot_questions, fetchHotQuestions } = useHots()
const { article_list, fetchArticlesByFolow, fetchRecommandArticles, setArticlePage } = useArticle()
const { topic_list, fetchTopics } = useTopics()
const { news_list, fetchHotNews } = useNews()
const { hot_resources, fetchHotResource, download } = useResource()
const data = ref([])
const type = ref('hot')
const userInfo = computed(() => store.state.userInfo)
const activeType = computed(() => {
  if (type.value === 'hot') {
    return 'Question'
  } else if (type.value === 'follow' || type.value === 'recommand') {
    return 'Article'
  } else if (type.value === 'news') {
    return 'News'
  }
})
const handleType = async (newType) => {
  switch (newType) {
    case 'hot':
      await fetchHotQuestions(10)
      data.value = hot_questions.value
      type.value = 'hot'
      break;
    case 'follow':
      setArticlePage()
      await fetchArticlesByFolow(10)
      data.value = article_list.value
      type.value = 'follow'
      break;
    case 'recommand':
      setArticlePage()
      await fetchRecommandArticles(10)
      data.value = article_list.value
      type.value = 'recommand'
      break;
    case 'news':
      setArticlePage()
      await fetchHotNews(10)
      data.value = news_list.value
      type.value = 'news'
      break;
    default:
      break;
  }
}
handleType('follow')

const swipers = ref([])
const links = ref([])
onMounted(() => {
  fetchTopics()
  fetchHotResource()
  axios.get('swiper').then(res => {
    swipers.value = res.data
  })
  axios.get('link').then(res => {
    links.value = res.data
  })
})

</script>
<style scoped>
.home-wrapper {
  @apply absolute left-0 right-0 w-[1200px] mx-auto;
}

.swiper-wrapper {
  @apply mt-10;
}

.nav {
  @apply mr-14 text-stone-500 leading-[4rem] cursor-pointer;
}

.nav-active {
  @apply border-b-4 border-stone-700;
}
</style>