<template>
  <div v-for="talk in talk_list" :key="talk._id" class="flex flex-col pt-4 pb-2 border-t-2">
    <div class="w-full">
      <div class="flex justify-between">
        <div class="flex items-center">
          <SuspendUserInfo :userInfo="talk.holder" :rounded="''"></SuspendUserInfo>
          <span class="support-text mx-2">回复</span>
          <SuspendUserInfo :userInfo="talk.holder" :showAvatar="false"></SuspendUserInfo>
        </div>
        <span class="support-text">{{ useTimeAgo(talk.updatedAt).value }}</span>
      </div>
      <div class="w-full pl-14">
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
          :replyTo="talk.holder?._id"
          :ref="(el) => setInputRef(el, talk._id)"
          @refresh="refresh"
        ></TalkInput>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex';
import { useTimeAgo } from '@vueuse/core'
import TalkInput from './talk-input.vue';
import useTalk from '../talk-list/useTalk'
import ActionList from '@/components/base/action-list/action-list.vue';
import useThumb from '@/components/base/action-list/useThumb'
import SuspendUserInfo from '@/components/base/suspend-userInfo/suspend-userInfo.vue'
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
