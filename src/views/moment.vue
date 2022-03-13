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
    <div class="moment-card">
      <textarea
        v-model="moment_detail.content"
        class="w-full outline-none p-2 box-border h-20"
        maxlength="120"
        placeholder="分享你的light"
      ></textarea>
      <div class="flex justify-between mt-4">
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
            <div class="text-xl">{{ moment.holder.nickname }}</div>
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
        <div class="flex justify-around items-center mt-5">
          <div class>分享</div>
          <div
            :class="{ 'text-rose-500': userInfo?.likingMoments?.includes(moment._id) }"
            @click="thumbHandle(moment, 'Moment')"
          >点赞</div>
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
</style>
