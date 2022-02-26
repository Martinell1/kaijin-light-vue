<template>
  <div v-show="visible" class="flex">
    <input
      v-model="talk_content"
      type="text"
      class="mb-4 mr-4 outline-none ring-inset ring-2 pl-4 ring-rose-500 w-full h-10"
    />
    <div class="btn" @click="publishHandle">发布</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { doTalk } from '@/api/talk'
const props = defineProps({
  articleId: {
    type: String,
    default: ''
  },
  rootTalkId: {
    type: String,
    default: ''
  },
  replyTo: {
    type: String,
    default: ''
  }
})
const talk_content = ref('')
const emit = defineEmits(['refresh'])
const publishHandle = async () => {
  const params = { 'content': talk_content.value }
  if (props.rootTalkId && props.replyTo) {
    params.rootTalkId = props.rootTalkId
    params.replyTo = props.replyTo
  }
  await doTalk(props.articleId, params)
  talk_content.value = ''
  emit('refresh')
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