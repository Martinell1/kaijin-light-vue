<template>
  <div class="fixed bottom-0 left-0 right-0 flex justify-center items-center bg-zinc-50 h-14">
    <ActionList
      class="pb-0"
      :voteCount="article_detail.voteCount"
      :voteActive="userInfo?.likingArticles.includes(article_detail._id)"
      :followActive="userInfo?.followingArticles.includes(article_detail._id)"
      :viewCount="article_detail.viewCount"
      :actionList="['follow', 'voteCount', 'viewCount']"
      :size="'text-lg'"
      @thumbClick="thumbHandle(article_detail, 'Article')"
      @followClick="followHandle(article_detail, 'Article')"
    ></ActionList>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex';
import ActionList from '@/components/base/action-list/action-list.vue';
import useThumb from '@/components/base/action-list/useThumb'
import useFollow from '@/components/base/action-list/useFollow'
defineProps({
  article_detail: {
    type: Object,
    default: {}
  }
})
const store = useStore()
const userInfo = computed(() => store.state.userInfo)

const { thumbHandle } = useThumb()

const { followHandle } = useFollow()

</script>
<style scoped>
</style>