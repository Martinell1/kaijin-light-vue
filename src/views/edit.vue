<template>
  <header class="h-16 shadow flex items-center">
    <input v-model="article.title" type="text" placeholder="标题" class="input h-14 w-full" />
    <router-link to="/">
      <div class="btn mx-4">返回主页</div>
    </router-link>
  </header>
  <input v-model="article.description" type="text" placeholder="简介" class="input h-14 w-full" />
  <MdEditor v-model="article.content" style=" min-height: 75vh;"></MdEditor>
  <footer class="flex justify-center mt-2">
    <div class="btn" @click="topicSelectClick">选择话题</div>
    <Modal ref="modalRef">
      <TopicSelect :select_topics="article.topics" @selectTopic="selectTopicHandle"></TopicSelect>
    </Modal>

    <div class="btn" @click="publishHandle">发布</div>
  </footer>
</template>

<script setup>
import { ref, inject } from 'vue'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import Modal from '../components/base/modal/modal.vue';
import TopicSelect from '../components/topic-list/topic-select.vue'
import { createArticle, updateArticle } from '@/api/article'
import { useRoute, useRouter } from 'vue-router';
import { getArticleDetail } from '../api/article';
const route = useRoute()

const useArticle = () => {
  const article = ref({
    title: '',
    description: '',
    content: '',
    avatar_url: '',
    topics: []
  })

  const fetchArticleDetail = async (id) => {
    const { data: result } = await getArticleDetail(id)
    article.value = result
  }
  return { article, fetchArticleDetail }
}

const { article, fetchArticleDetail } = useArticle()

if (route.params.id) {
  fetchArticleDetail(route.params.id)
}


const modalRef = ref(null)

const topicSelectClick = () => {
  modalRef.value.show()
}

const selectTopicHandle = (item) => {
  let index = article.value.topics.map(item => item._id).indexOf(item._id)

  if (index > -1) {
    article.value.topics.splice(index, 1)
  }
  if (article.value.topics.length < 5 && index < 0) {
    article.value.topics.push(item)
  }

}

const useMessage = inject('useMessage')
const router = useRouter()
const publishHandle = async () => {
  let res;
  let topics = article.value.topics;
  console.log(topics);
  let params = { ...article.value, topics }
  if (route.params.id) {
    const { data: result } = await updateArticle(route.params.id, params)
    useMessage('SUCCESS', '编辑成功', 2000)
    res = result
  } else {
    const { data: result } = await createArticle(params)
    useMessage('SUCCESS', '发布成功', 2000)
    res = result
  }
  if (res._id) {
    router.push({
      name: 'ArticleDetail',
      params: {
        id: res._id
      }
    })
  }
}
</script>
<style scoped>
.topic-item {
  @apply text-rose-500 bg-rose-50 hover:bg-rose-200;
}

.input {
  @apply px-4 border-gray-300 rounded-md outline-none  my-1;
}
</style>