<template>
  <div class="flex">
    <router-link
      v-for="topic in topics"
      :class="{ 'tag': tag, 'topic-item': !tag, 'active': active === topic._id }"
      :key="topic._id"
      :to="{ name: 'Search', params: { key: topic._id } }"
    >{{ topic.name }}</router-link>
  </div>
</template>

<script setup >
import { useRoute } from 'vue-router';

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

const route = useRoute()
const active = route.params.key
</script>
<style scoped>
.topic-item {
  @apply ml-3;
}

.active {
  @apply text-rose-500;
}
</style>