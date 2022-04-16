<template>
  <div class="flex justify-between items-center">
    <SuspendUserInfo :showAvatar="false" :userInfo="data.holder"></SuspendUserInfo>
    <TopicList :topics="data.topics" class="text-stone-500"></TopicList>
  </div>
  <div class="flex justify-between cursor-pointer" @click="goDetail(data)">
    <div class="w-full" :class="{ 'withAvatar': data.avatar_url }">
      <div class="font-bold text-lg text-rose-400">{{ data.title || data.question?.title }}</div>
      <div
        class="my-3 truncate text-stone-500"
        :class="{'w-[750px]':data.avatar_url}"
      >{{ fmtMarkDown(data.description) || fmtMarkDown(data.content) }}</div>
      <ActionList
        @click.stop
        :voteCount="data.voteCount"
        :voteActive="isVoted(data._id)"
        :viewCount="data.viewCount"
        :actionList="['voteCount', route.params.channel !== 'answer' ? 'voteCount' : '', 'comment', route.params.channel === 'question' ? 'writeAnswer' : '', route.params.id === userInfo?._id ? 'edit' : '']"
        @writeAnswerClick="goDetail(data)"
        @thumbClick="thumbHandle(data, route.params.channel)"
        @commentClick="goDetail(data)"
        @editClick="editHandle(data)"
      ></ActionList>
    </div>
    <img v-if="data.avatar_url" :src="data.avatar_url" class="w-40 h-24" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SuspendUserInfo from '../base/suspend-userinfo/suspend-userInfo.vue';
import TopicList from '../topic-list/topic-list.vue';
import ActionList from '../base/action-list/action-list.vue';
import { fmtMarkDown } from '../../js/utils';
import useThumb from '@/components/base/action-list/useThumb'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router';
defineProps({
  data: {
    type: Object,
    default: {}
  }
})

const route = useRoute()
const router = useRouter()
const store = useStore()
const { thumbHandle } = useThumb()

const userInfo = computed(() => store.state.userInfo)

const isVoted = (id) => {
  if (route.params.channel === 'question') {
    return userInfo.value?.likingQuestions.includes(id)
  } else if (route.params.channel === 'answer') {
    return userInfo.value?.likingAnswers.includes(id)
  } else if (route.params.channel === 'article') {
    return userInfo.value?.likingArticles.includes(id)
  }
}

const goDetail = (data) => {
  if (route.params.channel === 'answer') {
    data = data.question
  }
  if (['question', 'answer'].includes(route.params.channel)) {
    router.push({
      name: 'QuestionDetail',
      params: {
        id: data._id
      }
    })
  } else if (route.params.channel === 'article') {
    router.push({
      name: 'ArticleDetail',
      params: {
        id: data._id
      }
    })
  }
}

const editHandle = (data) => {
  const channel = route.params.channel
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
<style scoped>
</style>