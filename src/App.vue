<template></template>

<script setup>
import { getArticles } from '@/api/article'
const { data: result } = await getArticles(10, 1)
console.log(result);
</script>
<style lang='scss' scoped>
</style>