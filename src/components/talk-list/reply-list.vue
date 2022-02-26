<template>
  <div v-for="talk in talk_list" :key="talk._id" class="flex pt-4 pb-2 border-t-2">
    <img src="../../assets/images/static.jpg" class="w-8 h-8" />
    <div class="w-full ml-4">
      <div class="flex justify-between">
        <div>
          <span class="main-text">{{ talk.holder.nickname }}</span>
          <span class="support-text mx-2">回复</span>
          <span class="main-text">{{ talk.replyTo.nickname }}</span>
        </div>

        <span class="support-text">{{ useTimeAgo(talk.updatedAt).value }}</span>
      </div>

      <div class="my-2 text-lg text-stone-700">{{ talk.content }}</div>
      <ActionList
        :actionList="['voteCount', 'comment']"
        :voteCount="talk.voteCount"
        :voteActive="userInfo?.likingTalks.includes(talk._id)"
        @thumbClick="thumbHandle(talk, 'Talk')"
        @commentClick="talkHandle(talk._id)"
      ></ActionList>
      <TalkInput
        :articleId="articleId"
        :rootTalkId="rootTalkId"
        :replyTo="talk.holder._id"
        :ref="(el) => setInputRef(el, talk._id)"
        @refresh="refresh"
      ></TalkInput>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ActionList from '../action-list/action-list.vue';
import TalkInput from './talk-input.vue';
import useTalk from '../talk-list/useTalk'
import useThumb from '@/components/action-list/useThumb'
import { useStore } from 'vuex';
import { useTimeAgo } from '@vueuse/core'
const props = defineProps({
  articleId: {
    type: String,
    default: ''
  },
  rootTalkId: {
    type: String,
    default: ''
  }
})
const store = useStore()
const userInfo = computed(() => store.state.userInfo)
const { thumbHandle } = useThumb()

const { talk_list, setInputRef, talkHandle, fetchTalks } = useTalk()

fetchTalks(props.articleId, props.rootTalkId)
const refresh = () => {
  fetchTalks(props.articleId, props.rootTalkId)
}

defineExpose({
  refresh
})
</script>
<style scoped>
</style>