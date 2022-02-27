<template>
  <div class="flex">
    <div
      :class="tag ? 'tag' : 'topic-item'"
      v-for="topic in topics"
      :key="topic._id"
    >{{ topic.name }}</div>
  </div>
</template>

<script setup >
defineProps({
  topics: {
    type: Array,
    default: []
  },
  tag: {
    type: Boolean,
    default: false
  }
})
</script>
<style scoped>
.topic-item {
  @apply ml-3;
}
</style>