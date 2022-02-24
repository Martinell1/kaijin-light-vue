<template>
  <div class="content-list-wrapper shadow rounded bg-zinc-50">
    <div v-for="item in datas" :key="item.id" class="pt-4 px-6">
      <div class="flex justify-between mb-3 font-black text-xl text-stone-500">
        <div>{{ item.holder?.nickname }}</div>
        <div class="flex">
          <div class="topic-item" v-for="topic in item.topics" :key="topic.id">{{ topic.name }}</div>
        </div>
      </div>

      <router-link :to="{ name: title_type + 'Detail', params: { id: item._id } }">
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

      <ContentFooter :divide="true" @thumbHandle="thumb"></ContentFooter>
    </div>
  </div>
</template>

<script setup>
import ContentFooter from './content-footer.vue';

defineProps({
  datas: {
    type: Array,
    default: []
  },
  title_type: {
    type: String,
    default: 'Question'
  }
})

const thumb = () => {
  console.log('点赞');
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