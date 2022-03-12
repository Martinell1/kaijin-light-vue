<template>
  <header class="h-16 shadow flex items-center">
    <input v-model="article_detail.title" type="text" placeholder="标题" class="input h-14 w-full" />
    <router-link to="/">
      <div class="btn mx-4">返回主页</div>
    </router-link>
  </header>
  <main>
    <input
      v-model="article_detail.description"
      type="text"
      placeholder="简介"
      class="input h-14 w-full"
    />
    <div class="w-full input bg-white">
      <div class="flex justify-between h-12">
        <div class="flex">
          <span class="text-lg leading-[3rem] text-stone-400">查看封面</span>
          <div v-show="avatarVisible" class="btn relative my-1 ml-4">
            <Upload @onUpload="AvatarHandle" :sty="'w-full h-full'" />选择图片
          </div>
        </div>
        <svg
          @click="showAvatar"
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 my-2 cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div v-show="avatarVisible" class="mb-4">
        <img :src="article_detail.avatar_url" class="object-cover" />
      </div>
    </div>
    <MdEditor v-model="article_detail.content" @upload-img="onUploadImg" style=" min-height: 75vh;"></MdEditor>
  </main>
  <footer class="flex justify-center mt-4">
    <div class="btn mx-4" @click="topicSelectClick">选择话题</div>
    <Modal ref="modalRef">
      <TopicSelect :select_topics="article_detail.topics" @selectTopic="selectTopicHandle"></TopicSelect>
    </Modal>

    <div class="btn" @click="publishHandle">发布</div>
  </footer>
</template>

<script setup>
import { ref, inject } from 'vue'
import MdEditor from 'md-editor-v3';
import Upload from '../components/base/upload/upload.vue';
import 'md-editor-v3/lib/style.css';
import Modal from '../components/base/modal/modal.vue';
import TopicSelect from '../components/topic-list/topic-select.vue'
import { createArticle, updateArticle } from '@/api/article'
import { useRoute, useRouter } from 'vue-router';
import useArticle from '../hooks/useArticle';
import useUpload from '../components/base/upload/useUpload';
const { fetchToken, uploadToQiniu } = useUpload()
const route = useRoute()
const useMessage = inject('useMessage')
const { article_detail, fetchArticleDetail } = useArticle()

if (route.params.id) {
  fetchArticleDetail(route.params.id)
}


const avatarVisible = ref(false)
const showAvatar = () => {
  avatarVisible.value = !avatarVisible.value
}

const modalRef = ref(null)

const topicSelectClick = () => {
  modalRef.value.show()
}

const selectTopicHandle = (item) => {
  if (article_detail?.value.topics.length === 5) {
    useMessage('WARN', '最多可以选择五个标签', 2000)
  }
  let index = article_detail.value.topics.map(item => item._id).indexOf(item._id)

  if (index > -1) {
    article_detail.value.topics.splice(index, 1)
  }
  if (article_detail.value.topics.length < 5 && index < 0) {
    article_detail.value.topics.push(item)
  }

}


const router = useRouter()
const publishHandle = async () => {
  let res;
  let topics = article_detail.value.topics;
  let params = { ...article_detail.value, topics }
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

const AvatarHandle = (url) => {
  article_detail.value.avatar_url = url
}

const onUploadImg = async (files, callback) => {
  let file = files[0]
  let token = await fetchToken()
  if (token) {
    const form = new FormData();
    form.append("token", token)
    form.append("file", file)
    const url = await uploadToQiniu(form)
    let urls = []
    urls.push(url)
    callback(urls);
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