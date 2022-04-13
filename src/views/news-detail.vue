<template>
    <div class="main-wrapper pb-14">
        <div class="w-[1000px] h-[400px]">
            <img :src="news_detail.avatar_url" class="w-full h-full object-cover rounded" />
        </div>

        <div class="flex justify-between items-center">
            <h1 class="font-black text-xl my-6 text-rose-500">{{ news_detail.title }}</h1>
            <TopicList :topics="news_detail.topics" class="my-5"></TopicList>
        </div>
        <PreviewEditor :previewOnly="true" :modelValue="news_detail.content"></PreviewEditor>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import PreviewEditor from '@/components/base/editor/preview-editor.vue';
import TopicList from '@/components/topic-list/topic-list.vue';
import useFollow from '@/components/base/action-list/useFollow'
import useNews from '@/hooks/useNews';

const route = useRoute()

const { news_detail, fetchNewsDetail } = useNews()
fetchNewsDetail(route.params.id)

const { followHandle } = useFollow()
const store = useStore()
const userInfo = computed(() => store.state.userInfo)

</script>
<style scoped>
</style>