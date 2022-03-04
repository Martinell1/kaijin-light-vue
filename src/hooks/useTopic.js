import { ref } from 'vue';
import { getTopics } from '@/api/topic'

export default function useTopic(){
  // const topic_detail = ref({})

  // const fetchTopicDetail = async (id) => {
  //   const { data: result } = await getTopicDetail(id)
  //   topic_detail.value = result
  // }

  const topic_list = ref([])

  const fetchTopics = async (q) => {
    const { data: result } = await getTopics(q)
    topic_list.value = result
  }

  return { topic_list,fetchTopics}
}
