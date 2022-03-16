<template>
  <div v-for="resource in datas" class="shadow border rounded p-4 my-2 w-[700px]">
    <div class="flex justify-between">
      <h2 class="font-semibold text-lg">{{ resource.title }}</h2>
      <div class="text-sm">{{ resource.holder.nickname }}</div>
    </div>
    <div class="flex justify-between">
      <div>
        <TopicList :topics="resource.topics" :tag="'tag'" class="my-2"></TopicList>
        <div class="text-stone-500">{{ resource.description }}</div>
      </div>
      <div
        class="w-[100px] h-[100px] bg-stone-300 rounded text-center leading-[100px] text-stone-100 font-semibold"
      >下载</div>
    </div>
  </div>
</template>

<script setup>
import TopicList from '../topic-list/topic-list.vue';
defineProps({
  datas: {
    type: Array
  }
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