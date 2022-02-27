<template>
  <div class="shadow-lg my-4 py-5">
    <div class="ml-5 mr-4">
      <TalkInput :articleId="articleId" ref="talkInputRef" @refresh="refresh1"></TalkInput>
    </div>
    <div v-for="(talk, index) in talk_list" :key="talk._id" class="flex px-5 py-4">
      <SuspendUserInfo :userInfo="talk.holder" :showText="false" :rounded="''"></SuspendUserInfo>
      <div class="w-full border-b-2">
        <div class="flex justify-between">
          <SuspendUserInfo :userInfo="talk.holder" :showAvatar="false"></SuspendUserInfo>
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
          :rootTalkId="talk._id"
          @refresh="refresh2(index)"
          :replyTo="talk.holder?._id"
          :ref="(el) => setInputRef(el, talk._id)"
        ></TalkInput>
        <ReplyList
          :articleId="articleId"
          :rootTalkId="talk._id"
          :ref="(el) => setReplyRef(el, index)"
        ></ReplyList>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, watch, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useTimeAgo } from '@vueuse/core'
import TalkInput from './talk-input.vue';
import ReplyList from './reply-list.vue';
import useTalk from '../talk-list/useTalk'
import ActionList from '@/components/base/action-list/action-list.vue';
import useThumb from '@/components/base/action-list/useThumb'
import SuspendUserInfo from '@/components/base/suspend-userInfo/suspend-userInfo.vue'
const props = defineProps({
  articleId: {
    type: String,
    default: ''
  }
})
const store = useStore()
const userInfo = computed(() => store.state.userInfo)

watch(() => props.articleId, (articleId) => {
  fetchTalks(articleId)
})

const { talk_list, talkInputRef, replyRefs, setInputRef, setReplyRef, talkHandle, fetchTalks } = useTalk()

const { thumbHandle } = useThumb()

nextTick(() => {
  talkInputRef.value.shiftVisible()
})
const refresh1 = () => {
  fetchTalks(props.articleId)
}

const refresh2 = (index) => {
  replyRefs[index].refresh()
}

</script>
<style scoped>
</style>


