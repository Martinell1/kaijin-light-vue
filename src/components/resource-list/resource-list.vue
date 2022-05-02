<template>
  <div>
    <div v-for="resource in datas" class="shadow border rounded p-4 my-2 w-[700px]">
      <div class="flex justify-between">
        <h2 class="font-semibold text-lg">
          <a :href="resource.url" download target="_blank">{{ resource.title }}</a>
        </h2>
        <div class="text-sm">{{ resource.holder.nickname }}</div>
      </div>
      <div class="flex justify-between">
        <div>
          <TopicList :topics="resource.topics" class="my-2"></TopicList>
          <div class="text-stone-500">{{ resource.description }}</div>
        </div>
        <div @click="download(resource._id)"
          class="w-[100px] h-[100px] bg-stone-300 rounded text-center leading-[100px] text-stone-100 font-semibold">
          <a :href="resource.url" download target="_blank" class="leading-[100px] w-[100px] h-[100px]">{{ resource.type
              || '下载'
          }}</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>

import TopicList from '../topic-list/topic-list.vue';
import useResource from '../../hooks/useResource';


const { download } = useResource()
const props = defineProps({
  datas: {
    type: Array
  },
  fetchFn: {
    type: Function,
    default: () => {
      eturn
    }
  },
})


// function downloadFile (url, fileName) {
//   console.log(url, fileName);
//   var request = new XMLHttpRequest();
//   request.responseType = "blob";//定义响应类型
//   request.open("get", url);
//   request.onload = function () {
//     console.log(this.response);
//     var url = window.URL.createObjectURL(this.response);
//     console.log('url', url);
//     var a = document.createElement("a");
//     document.body.appendChild(a);
//     a.href = url;
//     a.download = fileName
//     a.click();
//   }
//   request.send();
// }




</script>
<style  scoped>
</style>