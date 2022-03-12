<template>
  <div v-if="['question', 'answer', 'article'].includes(route.params.channel)">
    <div v-for="data in datas" class="shadow border px-5 pt-4">
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
            :actionList="['voteCount', 'viewCount', 'comment', route.params.channel === 'question' ? 'writeAnswer' : '', route.params.id === userInfo?._id ? 'edit' : '']"
            @writeAnswerClick="goDetail(data)"
            @thumbClick="thumbHandle(data, route.params.channel)"
            @commentClick="goDetail(data)"
            @editClick="editHandle(data)"
          ></ActionList>
        </div>
        <img v-if="data.avatar_url" :src="data.avatar_url" class="w-40 h-24" />
      </div>
    </div>
  </div>
  <div v-if="['following', 'follower'].includes(route.params.channel)">
    <div v-for="data in datas" class="shadow border px-5 py-4">
      <router-link :to="{ name: 'UserDetail', params: { id: data._id } }">
        <SuspendUserInfo :userInfo="data"></SuspendUserInfo>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import useUser from '@/hooks/useUser'
import SuspendUserInfo from '../base/suspend-userinfo/suspend-userInfo.vue';
import TopicList from '../topic-list/topic-list.vue';
import ActionList from '../base/action-list/action-list.vue';
import useThumb from '@/components/base/action-list/useThumb'
import { fmtMarkDown } from '../../js/utils';
const route = useRoute()
const store = useStore()
const userInfo = computed(() => store.state.userInfo)
const datas = ref([])
const useMoment = async () => {
  switch (route.params.channel) {
    case 'question':
      await fetchQuestions(route.params.id)
      datas.value = question_list.value;
      break;
    case 'answer':
      await fetchAnswers(route.params.id)
      datas.value = answer_list.value;
      break;
    case 'article':
      await fetchArticles(route.params.id)
      datas.value = article_list.value;
      break;
    case 'following':
      await fetchFollowings(route.params.id)
      datas.value = following_list.value;
      break;
    case 'follower':
      await fetchFollowers(route.params.id)
      datas.value = follower_list.value;
      break;
    default:
      break;
  }
}

const { question_list, fetchQuestions, answer_list, fetchAnswers, article_list, fetchArticles, following_list, fetchFollowings, follower_list, fetchFollowers } = useUser()

watch(() => route.params.channel, async (newChannel) => {
  if (newChannel) {
    await useMoment()
  }
}, { immediate: true })

watch(() => route.params.id, async (newId) => {
  if (newId) {
    await useMoment()
  }
})

const { thumbHandle } = useThumb()

const isVoted = (id) => {
  if (route.params.channel === 'question') {
    return userInfo.value?.likingQuestions.includes(id)
  } else if (route.params.channel === 'answer') {
    return userInfo.value?.likingAnswers.includes(id)
  } else if (route.params.channel === 'article') {
    return userInfo.value?.likingArticles.includes(id)
  }
}

const router = useRouter()
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
  } else {
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
.withAvatar {
  max-width: calc(100% - 180px);
}
</style>