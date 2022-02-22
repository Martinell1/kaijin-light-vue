<template>
  <div class="content-list-wrapper mt-4 shadow">
    <div v-for="item in datas" :key="item.id" class="pt-4 px-6">
      <div>
        {{ item.author.nickname }}
        <div v-for="topic in item.topics" :key="topic.id">{{ topic }}}</div>
      </div>

      <div class="flex justify-between pb-4">
        <div>
          <h2 class="text-2xl font-semibold text-black">{{ item.title }}</h2>
          <div>{{ item.description }}</div>
        </div>
        <img src="../../assets/images/static.jpg" width="150" />
      </div>

      <div></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  datas: {
    type: Array,
    default: []
  }
})
</script>
<style scoped>
.content-list-wrapper {
  width: 700px;
}
</style>