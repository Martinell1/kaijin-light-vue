<template>
  <div @mouseenter="show" @mouseleave="hide" class="relative h-10">
    <div class="flex items-center h-10 z-10">
      <img
        v-if="showAvatar"
        src="../../../assets/images/static.jpg"
        class="w-10 h-10 mr-4"
        :class="'rounded' + rounded"
      />
      <span v-if="showText" class="text-lg font-bold">{{ userInfo.nickname }}</span>
    </div>
    <div
      v-show="visible"
      class="absolute -left-4 w-80 shadow flex flex-col bg-zinc-50 p-4 z-20 border"
      :class="{ 'top-10': showAvatar }"
    >
      <div class="flex">
        <img src="../../../assets/images/static.jpg" class="w-14 h-14 object-cover" />
        <div class="flex flex-col justify-between">
          <div class="ml-4 text-lg font-bold">{{ userInfo.nickname }}</div>
          <div class="ml-4 text-lg font-bold">{{ userInfo.headline }}</div>
        </div>
      </div>
      <div class="flex mt-4 item-end">
        <div class="follow-item">
          <label>关注数</label>
          <span class="follow-count">{{ userInfo.followings?.length }}</span>
        </div>
        <div class="follow-item">
          <label>粉丝数</label>
          <span class="follow-count">{{ follower_list.length }}</span>
        </div>
        <div class="follow-item" v-if="me._id !== userInfo._id">
          <div
            @click="doFollowHandle"
            class="text-center text-white font-semibold bg-rose-500 ring-rose-300 ring-inset ring-4 rounded-lg leading-10 cursor-pointer"
          >
            <span v-show="isFollow">已关注</span>
            <span v-show="!isFollow">关注</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex';
import useFollow from '@/components/base/action-list/useFollow'
import useUser from '@/hooks/useUser'

const props = defineProps({
  userInfo: {
    type: Object,
    default: {}
  },
  showAvatar: {
    type: Boolean,
    default: true
  },
  showText: {
    type: Boolean,
    default: true
  },
  rounded: {
    type: String,
    default: '-full'
  }
})
const visible = ref(false)

const { follower_list, fetchFollowers } = useUser()


const show = () => {
  visible.value = true
  fetchFollowers(props.userInfo._id)
}

const hide = () => {
  visible.value = false
}

const store = useStore()
const me = computed(() => store.state.userInfo)

const { followHandle } = useFollow()

const isFollow = computed(() => me.value?.followings?.includes(props.userInfo._id))

const doFollowHandle = () => {
  if (isFollow.value) {
    --follower_list.value.length;
  } else {
    ++follower_list.value.length
  }
  followHandle(props.userInfo, '')
}
</script>
<style scoped>
.follow-item {
  @apply flex-1 flex flex-col text-base;
}
.follow-count {
  @apply text-left;
}
</style>