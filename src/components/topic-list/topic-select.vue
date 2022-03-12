<template>
  <div
    class="flex flex-col flex-wrap content-start bg-zinc-50 border text-center absolute left-20 top-20 bottom-20 right-20 p-6"
  >
    <div
      v-for="topic in topic_list"
      @click="topicClick(topic)"
      class="py-2 px-4 w-40 shadow border-2 h-16 leading-[3rem] box-border"
      :class="{ 'bg-rose-200 ': select_topics.map(item => item._id).includes(topic._id) }"
    >{{ topic.name }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getTopics } from '@/api/topic'
defineProps({
  select_topics: {
    type: Array,
    default: []
  }
})
const useTopic = () => {
  const topic_list = ref([])

  const fetchTopics = async () => {
    const { data: result } = await getTopics()
    topic_list.value = [...topic_list.value, ...result]
  }

  return { topic_list, fetchTopics }
}
const { topic_list, fetchTopics } = useTopic()
fetchTopics()

const emit = defineEmits(['selectTopic'])
const topicClick = (item) => {
  emit('selectTopic', item)
}

</script>
<style  scoped>
</style>