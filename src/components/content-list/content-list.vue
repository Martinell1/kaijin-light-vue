<template>
  <div ref="scrollRef" class="content-list-wrapper shadow rounded bg-zinc-50">
    <div v-for="item in datas" :key="item.id" class="pt-4 px-6">
      <div class="flex justify-between mb-3 font-black text-xl text-stone-500">
        <SuspendUserInfo :userInfo="item.holder" :showAvatar="false"></SuspendUserInfo>
        <TopicList :topics="item.topics"></TopicList>
      </div>

      <router-link :to="{ name: content_type + 'Detail', params: { id: item._id } }">
        <h2 class="font-black text-xl text-rose-500">{{ item.title }}</h2>
      </router-link>

      <div class="flex justify-between mt-3">
        <div class="text-lg text-stone-500 mb-2">{{ item.description }}</div>
        <img
          v-if="item.avatar_url"
          :src="item.avatar_url"
          width="190"
          height="105"
          class="ml-4"
        />
      </div>
      <ActionList
        :voteCount="item.voteCount"
        :voteActive="content_type === 'Question' ? userInfo?.likingQuestions.includes(item._id) : userInfo?.likingArticles.includes(item._id)"
        :viewCount="item.viewCount"
        :divide="true"
        :actionList="['voteCount', 'viewCount', content_type === 'Article' ? 'comment' : '']"
        @thumbClick="thumbHandle(item, content_type)"
        @commentClick="commentHandle(item)"
      ></ActionList>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import ActionList from '../../components/base/action-list/action-list.vue';
import useThumb from '../base/action-list/useThumb'
import SuspendUserInfo from '@/components/base/suspend-userInfo/suspend-userInfo.vue'
import TopicList from '../topic-list/topic-list.vue';
import useScroll from '../../hooks/useScroll';

const store = useStore()

const userInfo = ref(store.state.userInfo)
const props = defineProps({
  datas: {
    type: Array,
    default: []
  },
  content_type: {
    type: String,
    default: 'Question'
  },
  fetchFn: {
    type: Function,
    default: () => {
      return
    }
  }
})
const { thumbHandle } = useThumb()

const router = useRouter()
const commentHandle = (item) => {
  router.push({
    name: props.content_type + 'Detail',
    params: {
      id: item._id
    }
  })
}

const scrollRef = ref(null)
useScroll(scrollRef, props.fetchFn)

</script>
<style scoped>
.content-list-wrapper {
  width: 700px;
}
</style>