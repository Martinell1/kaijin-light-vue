<template>
  <div v-show="visible" class="flex">
    <input
      v-model="comment_content"
      type="text"
      class="mb-4 mr-4 outline-none ring-inset ring-2 pl-4 ring-rose-500 w-full h-10"
    />
    <div class="btn" @click="publishHandle">发布</div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { doComment } from '@/api/comment'
const props = defineProps({
  questionId: {
    type: String,
    default: ''
  },
  answerId: {
    type: String,
    default: ''
  },
  rootCommentId: {
    type: String,
    default: ''
  },
  replyTo: {
    type: String,
    default: ''
  }
})
const useMessage = inject('useMessage')
const comment_content = ref('')
const emit = defineEmits(['refresh'])
const publishHandle = async () => {
  const params = { 'content': comment_content.value }
  if (props.rootCommentId && props.replyTo) {
    params.rootCommentId = props.rootCommentId
    params.replyTo = props.replyTo
  }
  const { data: comment } = await doComment(props.questionId, props.answerId, params)
  useMessage('SUCCESS', '发布成功', 2000)
  comment_content.value = ''
  emit('refresh', comment)
}

const visible = ref(false)
const shiftVisible = () => {
  visible.value = !visible.value
}

defineExpose({
  shiftVisible
})


</script>
<style  scoped>
</style>