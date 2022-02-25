<template>
  <div class="content-list-wrapper shadow rounded bg-zinc-50">
    <div v-for="item in datas" :key="item.id" class="pt-4 px-6">
      <div class="flex justify-between mb-3 font-black text-xl text-stone-500">
        <div>{{ item.holder?.nickname }}</div>
        <div class="flex">
          <div class="topic-item" v-for="topic in item.topics" :key="topic._id">{{ topic.name }}</div>
        </div>
      </div>

      <router-link :to="{ name: content_type + 'Detail', params: { id: item._id } }">
        <h2 class="font-black text-xl text-rose-500">{{ item.title }}</h2>
      </router-link>

      <div class="flex justify-between mt-3">
        <div class="text-lg text-stone-500 mb-2">{{ item.description }}</div>
        <img
          v-if="item.avatar_url"
          src="../../assets/images/static.jpg"
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
        :actionList="['voteCount', 'viewCount', 'comment']"
        @thumbClick="thumbHandle(item, content_type)"
      ></ActionList>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ActionList from '../../components/action-list/action-list.vue';
import { useStore } from 'vuex';
import useThumb from '../action-list/useThumb'

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
  }
})

const { thumbHandle } = useThumb()

</script>
<style scoped>
.content-list-wrapper {
  width: 700px;
}

.topic-item {
  @apply ml-3;
}
</style>