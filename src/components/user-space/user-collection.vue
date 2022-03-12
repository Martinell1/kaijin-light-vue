<template>
  <div class="flex shadow mt-4 border px-2">
    <div class="nav-item" @click="fieldHandle('question')">问题</div>
    <div class="nav-item" @click="fieldHandle('article')">文章</div>
  </div>
  <div v-for="data in datas" :key="data" class="shadow border px-5 pt-4">
    <CollectionCard :field="field" :id="data"></CollectionCard>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import useUser from '../../hooks/useUser';
import CollectionCard from './collection-card.vue';
const field = ref('')
const datas = ref([])
const route = useRoute()

const { user_detail, fetchUserDetail } = useUser()
watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchUserDetail(newId)
  }
}, { immediate: true })
watch(field, (newField) => {
  if (newField) {
    switch (newField) {
      case 'question':
        datas.value = user_detail.value.followingQuestions;
        break;
      case 'answer':
        datas.value = user_detail.value.followingAnswers;
        break;
      case 'article':
        datas.value = user_detail.value.followingArticles;
        break;
    }
  }

}, { immediate: true })

const fieldHandle = (newField) => {
  field.value = newField
}
</script>
<style  scoped>
.nav-item {
  @apply text-xl px-4 py-2 text-stone-700 cursor-pointer;
}
</style>