<template>
    <div>
        <div v-for="resource in resource_list" class="shadow border rounded px-4 my-4">
            <h2 class="font-semibold text-lg">{{ resource.title }}</h2>
            <TopicList :topics="resource.topics" :tag="'tag'"></TopicList>
            <div class="text-sm">{{ resource.holder.nickname }}</div>
            <div>{{ resource.description }}</div>
        </div>
    </div>
</template>

<script setup>
import useResource from '../hooks/useResource';
import TopicList from '../components/topic-list/topic-list.vue';
const { resource_list, fetchResources } = useResource()
fetchResources()
</script>

<style scoped></style>