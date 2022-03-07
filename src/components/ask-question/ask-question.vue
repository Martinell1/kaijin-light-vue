<template>
  <div class="w-[700px] p-5 bg-zinc-50">
    <input
      v-model="question_detail.title"
      type="text"
      placeholder="问题"
      class="px-4 border-gray-300 rounded-md outline-none my-1 h-10 w-full"
    />
    <MdEditor v-model="question_detail.description" :preview="false"></MdEditor>
    <footer class="flex justify-center mt-4">
      <div class="btn mr-4" @click="topicSelectClick">选择话题</div>
      <Modal ref="modalRef">
        <TopicSelect :select_topics="question_detail.topics" @selectTopic="selectTopicHandle"></TopicSelect>
      </Modal>

      <div class="btn" @click="publishHandle">发布</div>
    </footer>
  </div>
</template>

<script setup >
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import Modal from '@/components/base/modal/modal.vue';
import TopicSelect from '@/components/topic-list/topic-select.vue'
import { createQuestion } from '@/api/question'

const modalRef = ref(null)
const topicSelectClick = () => {
  modalRef.value.show()
}

const question_detail = ref({
  title: '',
  description: '',
  avatar_url: '',
  topics: []
})

const selectTopicHandle = (item) => {
  let index = question_detail.value.topics.map(item => item._id).indexOf(item._id)
  if (index > -1) {
    question_detail.value.topics?.splice(index, 1)
  }
  if (question_detail.value.topics?.length < 5 && index < 0) {
    question_detail.value.topics?.push(item)
  }
}

const useMessage = inject('useMessage')
const router = useRouter()
const emit = defineEmits(['hide'])
const publishHandle = async () => {
  const { data: result } = await createQuestion(question_detail.value)
  useMessage('SUCCESS', '发布成功', 2000)
  if (result._id) {
    router.push({
      name: 'QuestionDetail',
      params: {
        id: result._id
      }
    })
    emit('hide')
  }
}
</script>
<style scoped>
</style>