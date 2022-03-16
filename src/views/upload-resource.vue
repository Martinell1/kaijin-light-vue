<template>
  <div class="border shadow bg-zinc-50 px-8 py-4 w-[1000px]">
    <h1 class="font-semibold">上传资源</h1>
    <div class="upload-item">
      <label for="upload" class="w-full h-12 border text-center leading-[3rem] text-sm">
        <div v-if="resource.url">{{ resource.url }}</div>上传
      </label>
      <input
        ref="uploadRef"
        id="upload"
        type="file"
        class="hidden"
        @change="onChangeHandle"
        enctype="multipart/form-data"
        accept="*"
      />
    </div>
    <div class="upload-item">
      <span class="w-24">资源名称</span>
      <input type="text" v-model="resource.title" class="upload-input" />
    </div>
    <div class="upload-item">
      <span class="w-24">资源描述</span>
      <textarea type="text" v-model="resource.description" class="upload-input h-40" />
    </div>
    <div class="upload-item">
      <span class="w-24">资源标签</span>
      <div class="btn" @click="topicSelectClick">选择话题</div>
      <Modal ref="modalRef">
        <TopicSelect :select_topics="resource.topics" @selectTopic="selectTopicHandle"></TopicSelect>
      </Modal>
    </div>
    <div class="flex justify-end">
      <div class="btn mt-5" @click="handleUpload">提交</div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue';
import Modal from '../components/base/modal/modal.vue';
import TopicSelect from '../components/topic-list/topic-select.vue'
import { createResource } from '@/api/resource'
import { useStore } from 'vuex';
import useUpload from '../components/base/upload/useUpload';
const topicSelectClick = () => {
  modalRef.value.show()
}
const useMessage = inject('useMessage')
const store = useStore()
const userInfo = computed(() => store.state.userInfo)
const modalRef = ref(null)
const resource = ref({
  title: '',
  description: '',
  topics: [],
  holder: '',
  url: ''
})
const selectTopicHandle = (item) => {
  if (resource?.value.topics.length === 5) {
    useMessage('WARN', '最多可以选择五个标签', 2000)
  }
  let index = resource.value.topics.map(item => item._id).indexOf(item._id)

  if (index > -1) {
    resource.value.topics.splice(index, 1)
  }
  if (resource.value.topics.length < 5 && index < 0) {
    resource.value.topics.push(item)
  }
}

const uploadRef = ref(null)
const { fetchToken, uploadToQiniu } = useUpload()
const onChangeHandle = async () => {
  const file = uploadRef.value.files[0];
  console.log(file);
  let token = await fetchToken()
  if (token) {
    const form = new FormData();
    form.append("token", token)
    form.append("file", file)
    const url = await uploadToQiniu(form)
    const type = file.name.split('.').pop()
    console.log(type);
    resource.value.url = url + '?attname=' + file.name
    resource.value.type = type
  }
}

const handleUpload = async () => {
  resource.value.holder = userInfo.value._id
  let { data: result } = await createResource(resource.value)
  if (result) {
    useMessage('SUCCESS', '上传成功', 2000)
  }
}

</script>
<style scoped>
.upload-item {
  @apply flex mt-5;
}

.upload-input {
  @apply border border-stone-300 w-full outline-none px-4 py-2 rounded;
}
</style>