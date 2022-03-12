<template>
  <div class="flex justify-between items-center">
    <SuspendUserInfo :showAvatar="false" :userInfo="data.holder"></SuspendUserInfo>
    <TopicList :topics="data.topics" class="text-stone-500"></TopicList>
  </div>
  <div class="flex justify-between cursor-pointer" @click="goDetail(data)">
    <div :class="{ 'withAvatar': data.avatar_url }">
      <div class="font-bold text-xl text-rose-400">{{ data.title || data.question?.title }}</div>
      <div
        class="my-3 truncate text-stone-500"
      >{{ fmtMarkDown(data.description) || fmtMarkDown(data.content) }}</div>
      <ActionList
        @click.stop
        :voteCount="data.voteCount"
        :voteActive="isVoted(data._id)"
        :viewCount="data.viewCount"
        :actionList="['voteCount', 'viewCount', 'comment', field === 'question' ? 'writeAnswer' : '', route.params.id === userInfo?._id ? 'edit' : '']"
        @writeAnswerClick="goDetail(data)"
        @thumbClick="thumbHandle(data, field)"
        @commentClick="goDetail(data)"
        @editClick="editHandle(data)"
      ></ActionList>
    </div>
    <img v-if="data.avatar_url" :src="data.avatar_url" class="w-40 h-24" />
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router';
import ActionList from '../base/action-list/action-list.vue';
import useArticle from '../../hooks/useArticle';
import useQuestion from '../../hooks/useQuestion';
import useThumb from '@/components/base/action-list/useThumb'
import SuspendUserInfo from '../base/suspend-userinfo/suspend-userInfo.vue';
import TopicList from '../topic-list/topic-list.vue';
import { fmtMarkDown } from '../../js/utils';

const props = defineProps({
  field: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  },
})
const store = useStore()
const userInfo = computed(() => store.state.userInfo)
const route = useRoute()
const router = useRouter()
const data = ref({})
const { thumbHandle } = useThumb()
const { article_detail, fetchArticleDetail } = useArticle()
const { question_detail, fetchQuestionDetail } = useQuestion()
onMounted(async () => {
  if (props.field === 'question') {
    await fetchQuestionDetail(props.id)
    data.value = question_detail.value
  } else if (props.field === 'article') {
    await fetchArticleDetail(props.id)
    data.value = article_detail.value
  }
})

const isVoted = (id) => {
  if (props.field === 'question') {
    return userInfo.value?.likingQuestions.includes(id)
  } else if (props.field === 'answer') {
    return userInfo.value?.likingAnswers.includes(id)
  } else if (props.field === 'article') {
    return userInfo.value?.likingArticles.includes(id)
  }
}

const goDetail = (data) => {
  if (props.field === 'answer') {
    data = data.question
  }
  if (['question', 'answer'].includes(props.field)) {
    router.push({
      name: 'QuestionDetail',
      params: {
        id: data._id
      }
    })
  } else if (props.field === 'article') {
    router.push({
      name: 'ArticleDetail',
      params: {
        id: data._id
      }
    })
  }
}

const editHandle = (data) => {
  const channel = props.field
  if (channel === 'question') {
    router.push({
      name: 'QuestionDetail',
      params: {
        id: data._id
      }
    })
  } else if (channel === 'article') {
    router.push({
      name: 'Edit',
      params: {
        id: data._id
      }
    })
  }
}
</script>
<style  scoped>
</style>