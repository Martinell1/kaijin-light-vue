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
        <ul v-for="(resource, index) in hot_resources">
          <li @click="download(resource._id)">
            <a :href="resource.url" download target="_blank" class="flex relative my-2">
              <span class="inline-block w-4 text-center mr-4 font-semibold">{{ index + 1 }}</span>
              <div class="w-[150px] truncate">{{ resource.title }}</div>
              <span
                class="inline-block w-7 h-7 bg-stone-200 rounded text-center leading-7 absolute right-0"
              >{{ resource.downloadCount }}</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script setup>
import useResource from '../hooks/useResource';
import ResourceList from '../components/resource-list/resource-list.vue';

const { hot_resources, resource_list, fetchResources, fetchHotResource, download } = useResource()
fetchResources()
fetchHotResource()
</script>

<style scoped></style>