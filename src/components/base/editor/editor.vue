<template>
  <div v-show="visible" class="mt-5 bg-zinc-50 shadow-md">
    <MdEditor v-model="content" :preview="false" :toolbars="TOOL"></MdEditor>
    <div class="flex justify-end py-4">
      <div class="btn mr-8" @click="publishHandle">发布回答</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import { doAnswer, updateAnswer } from '@/api/answer'
import { useRoute } from 'vue-router';
import { TOOL } from '@/js/constance'
const id = ref('')
const content = ref('')
const visible = ref(false)
const show = () => {
  visible.value = true
}

const hide = () => {
  visible.value = false
}

const shiftVisible = () => {
  visible.value = !visible.value
}

defineExpose({
  id,
  content,
  show,
  hide,
  shiftVisible,
})

const route = useRoute()
const emit = defineEmits(['refresh'])
const publishHandle = async () => {
  const params = { 'content': content.value }
  if (id.value) {
    await updateAnswer(route.params.id, id.value, params)
  } else {
    await doAnswer(route.params.id, params);
  }
  emit('refresh')
  hide()
}
</script>
<style scoped>
</style>