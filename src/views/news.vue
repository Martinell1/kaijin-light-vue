<template>
    <main>
        <NewsList :datas="news_list" :fetchFn="fetchNewss"></NewsList>
    </main>
</template>

<script setup>
import useNews from '@/hooks/useNews';
import NewsList from '../components/news-list/news-list.vue';

const { news_list, fetchNewss } = useNews()
fetchNewss()
</script>
<style lang='scss' scoped>
</style>