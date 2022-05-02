<template>
    <main ref="scrollRef">
        <NewsList :datas="news_list" :fetchFn="fetchNewss"></NewsList>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import useNews from '@/hooks/useNews';
import NewsList from '../components/news-list/news-list.vue';
import useScroll from '../hooks/useScroll';

const { news_list, fetchNewss } = useNews()
fetchNewss(10)
const scrollRef = ref(null)
useScroll(scrollRef, fetchNewss)

</script>
<style lang='scss' scoped>
</style>