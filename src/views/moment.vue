<template>
  <aside>
    <div class="w-[280px] shadow rounded bg-zinc-50 mr-5 border px-4 text-stone-500">
      <div class="side-item" :class="{ 'side-item-active': active === 'last' }" @click="SortBy()">最新</div>
      <div
        class="side-item"
        :class="{ 'side-item-active': active === 'hot' }"
        @click="SortBy('voteCount')"
      >热门</div>
      <div
        class="side-item"
        :class="{ 'side-item-active': active === 'follow' }"
        @click="SortBy('follow')"
      >关注</div>
    </div>
  </aside>
  <div class="flex flex-col">
    <div class="w-full h-[150px]">
      <img src="../assets/images/moment.jpg" class="w-full h-full rounded object-cover" />
    </div>
    <h2 class="text-stone-500 text-xl font-semibold my-2">动态区</h2>
    <div class="moment-card">
      <textarea
        v-model="moment_detail.content"
        class="w-full outline-none p-2 box-border h-20"
        maxlength="120"
        placeholder="分享你的light"
      ></textarea>
      <div class="flex justify-between my-4">
        <div class="btn relative">
          <Upload @onUpload="uploadHandle" :sty="'w-full h-full'" />图片
        </div>
        <div class="btn" @click="publicMoment">发布</div>
      </div>
    </div>
    <div>
      <div v-for="moment in moment_list" :key="moment._id" class="moment-card mt-4">
        <div class="flex">
          <img class="w-12 h-12 rounded-full mr-5" :src="moment.holder.avatar_url" />
          <div class="flex flex-col justify-between">
            <div class="text-lg">{{ moment.holder.nickname }}</div>
            <div class="mb-4 text-zinc-500">{{ new Date(moment.updatedAt).toDateString() }}</div>
          </div>
        </div>
        <div class="pl-16 pb-4 border-b">
          <div class="mb-2">{{ moment.content }}</div>
          <div v-if="moment.imgs">
            <div v-for="(img, index) in moment.imgs" :key="img + '-' + index">
              <img :src="moment.imgs[index]" width="110" height="110" />
            </div>
          </div>
        </div>
        <div class="flex justify-around items-center my-2">
          <div class="act-item">
            <ShareIcon class="act-item-icon"></ShareIcon>
            <div class="act-item-text">分享</div>
          </div>
          <div
            class="act-item"
            :class="{ 'act-item-active': userInfo?.likingMoments?.includes(moment._id) }"
            @click="thumbHandle(moment, 'Moment')"
          >
            <ThumbUpIcon class="act-item-icon"></ThumbUpIcon>
            <div class="act-item-text">点赞数 {{ moment.voteCount }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup >
import { ref, computed } from 'vue';
import Upload from '../components/base/upload/upload.vue';
import useThumb from '@/components/base/action-list/useThumb'
import { useStore } from 'vuex';
import useMoment from '../hooks/useMoment'
import { ShareIcon, ThumbUpIcon } from '@heroicons/vue/solid'
const store = useStore()
const userInfo = computed(() => store.state.userInfo)

const { moment_detail, moment_list, publicMoment, fetchMoments, setPage, fetchMomentsBySort, fetchFollowingMoments } = useMoment()
fetchMoments(10)

const uploadHandle = (url) => {
  moment_detail.value.imgs.push(url)
}

const { thumbHandle } = useThumb()

const active = ref('last')

const SortBy = (SortBy) => {
  setPage()

  if (SortBy === 'voteCount') {
    active.value = 'hot'
    fetchMomentsBySort(10, SortBy)
  } else if (SortBy === 'follow') {
    active.value = 'follow'
    fetchFollowingMoments(10)
  } else {
    active.value = 'last'
    fetchMomentsBySort(10, SortBy)
  }
}
</script>
<style  scoped>
.side-item {
  @apply w-full h-12 pl-4 hover:bg-stone-200 leading-[3rem] my-4 cursor-pointer;
}

.side-item-active {
  @apply bg-rose-100;
}

.act-item {
  @apply flex items-center text-stone-500 mr-6 cursor-pointer;
}

.act-item-active {
  @apply text-rose-500;
}

.act-item-icon {
  @apply h-5 w-5 mr-2;
}

.act-item-text {
  @apply leading-5;
}
</style>
