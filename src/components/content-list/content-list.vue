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
      <ContentFooter
        :voteCount="item.voteCount"
        :voteActive="content_type === 'Question' ? userInfo?.likingQuestions.includes(item._id) : userInfo?.likingArticles.includes(item._id)"
        :divide="true"
        @thumbClick="thumbHandle(item)"
      ></ContentFooter>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ContentFooter from './content-footer.vue';
import { thumb, unthumb } from '@/api/user';
import { useStore } from 'vuex';
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

const thumbHandle = async (item) => {
  let id = item._id
  let entity = "liking" + props.content_type + 's'

  let list = userInfo.value[entity].slice()
  console.log(list);
  let index = list.indexOf(id)
  if (index > -1) {
    await unthumb(entity, id)
    list.splice(index, 1)
    item.voteCount--
  } else {
    await thumb(entity, id)
    list.push(id)
    item.voteCount++
  }

  store.commit('setLikingQuestions', list)
  const u = JSON.parse(localStorage.getItem("userInfo"));

  u[entity] = list

  localStorage.setItem('userInfo', JSON.stringify(u))
}
</script>
<style scoped>
.content-list-wrapper {
  width: 700px;
}

.topic-item {
  @apply ml-3;
}
</style>