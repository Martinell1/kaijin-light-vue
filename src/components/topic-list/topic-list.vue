<template>
  <div class="flex">
    <router-link
      v-for="topic in topics"
      :class="{ 'tag': tag, 'active': active === topic._id }"
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
    type: String,
    default: 'tag'
  }
})

const route = useRoute()
const active = route.params.key
</script>
<style scoped>

.active {
  @apply text-rose-500;
}

.tag{
  @apply text-xs leading-8 h-8
}

</style>