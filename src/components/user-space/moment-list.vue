<template>
  <div v-if="['question', 'answer', 'article'].includes(route.params.channel)">
    <div v-for="data in datas" class="shadow border px-5 pt-4">
      <DataCard :data="data"></DataCard>
    </div>
  </div>
  <div v-if="['following', 'follower'].includes(route.params.channel)">
    <div v-for="data in datas" class="shadow border px-5 py-4">
      <router-link :to="{ name: 'UserDetail', params: { id: data._id } }">
        <SuspendUserInfo :userInfo="data"></SuspendUserInfo>
      </router-link>
    </div>
  </div>
  <div v-if="route.params.channel === 'collection'">
    <UserCollection></UserCollection>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import useUser from '@/hooks/useUser'
import DataCard from './data-card.vue'
import SuspendUserInfo from '../base/suspend-userinfo/suspend-userInfo.vue';

import UserCollection from './user-collection.vue';
const route = useRoute()

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





</script>
<style scoped>
.withAvatar {
  max-width: calc(100% - 180px);
}
</style>