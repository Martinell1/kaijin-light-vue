<template>
  <div class="flex justify-between mx-auto">
    <div class="flex flex-col">
      <div class="w-full h-[150px]">
        <img src="../assets/images/resource.jpg" class="w-full h-full rounded object-cover" />
      </div>
      <h2 class="text-stone-500 text-xl font-semibold mt-2">资源区</h2>
      <ResourceList :datas="resource_list"></ResourceList>
    </div>

    <aside>
      <div class="w-[280px] ml-5 shadow border px-5 py-4">
        <div class="text-stone-500 leading-8 mb-2">热门资源</div>
        <div
          v-for="(resource, index) in resource_list"
          :key="resource._id"
          class="flex h-9 items-center relative hover:bg-stone-200"
        >
          <span class="inline-block w-4 text-center mr-4 font-semibold">{{ index + 1 }}</span>
          <span>{{ resource.title }}</span>
          <!-- <span
          class="inline-block w-7 h-7 bg-stone-200 rounded text-center leading-7 absolute right-0"
          >{{ resource.downloadCount }}</span>-->
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import useResource from '../hooks/useResource';
import ResourceList from '../components/resource-list/resource-list.vue';

const { resource_list, fetchResources } = useResource()
fetchResources()
</script>

<style scoped></style>