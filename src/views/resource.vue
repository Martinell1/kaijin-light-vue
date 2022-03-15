<template>
    <h1>{{ resource_list }}</h1>
</template>

<script setup>
import useResource from '../hooks/useResource';
const { resource_list, fetchResources } = useResource()
fetchResources()
</script>

<style scoped></style>