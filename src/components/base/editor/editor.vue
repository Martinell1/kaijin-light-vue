<template>
  <div v-show="visible" class="mt-5 bg-zinc-50 shadow-md">
    <MdEditor v-model="content" :preview="false" :toolbars="TOOL" @upload-img="onUploadImg"></MdEditor>
    <div class="flex justify-end py-4">
      <div class="btn mr-8" @click="publishHandle">发布回答</div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import MdEditor from 'md-editor-v3';
import { doAnswer, updateAnswer } from '@/api/answer'
import { useRoute } from 'vue-router';
import { TOOL } from '@/js/constance'
import useUpload from '../upload/useUpload';
const { fetchToken, uploadToQiniu } = useUpload()
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

const useMessage = inject('useMessage')
const route = useRoute()
const emit = defineEmits(['refresh'])
const publishHandle = async () => {
  const params = { 'content': content.value }
  if (id.value) {
    await updateAnswer(route.params.id, id.value, params)
    useMessage('SUCCESS', '编辑成功', 2000)
  } else {
    await doAnswer(route.params.id, params);
    useMessage('SUCCESS', '发布成功', 2000)
  }
  emit('refresh')
  hide()
}

const onUploadImg = async (files, callback) => {
  let file = files[0]
  let token = await fetchToken()
  if (token) {
    const form = new FormData();
    form.append("token", token)
    form.append("file", file)
    const url = await uploadToQiniu(form)
    let urls = []
    urls.push(url)
    callback(urls);
  }
}
</script>
<style scoped>
</style>