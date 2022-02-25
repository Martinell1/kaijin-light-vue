<template>
  <div v-show="visible" class="mt-5 bg-zinc-50 shadow-md">
    <MdEditor v-model="content" :preview="false"></MdEditor>
    <div class="flex justify-end py-4">
      <div class="btn" @click="publishHandle">发布回答</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import { doAnswer } from '@/api/answer'
import { useRoute } from 'vue-router';

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
  show,
  hide,
  shiftVisible,
})

const content = ref('')
const route = useRoute()
const publishHandle = async () => {
  const params = { 'content': content.value }
  await doAnswer(route.params.id, params);
  hide()
}
</script>
<style scoped>
</style>