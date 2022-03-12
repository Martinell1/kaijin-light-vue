<template>
  <teleport to="#app">
    <transition name="slide-down">
      <div
        class="message ring-inset ring-8"
        :class="{ ' bg-green-300 ring-green-400': type === 'SUCCESS', ' bg-rose-300 ring-rose-400': type === 'FAIL', ' bg-orange-300 ring-orange-400': type === 'WARN' }"
        @click="closeHandle"
      >
        <div class="text-zinc-500 text-center">{{ message }}</div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
const type = ref('')
const message = ref('')
const index = ref(1)

const setMessage = (type_info, message_info, index_info) => {
  type.value = type_info
  message.value = message_info
  index.value = index_info
}

defineExpose({
  setMessage
})

</script>
<style  scoped>
.message {
  @apply fixed left-1/2 top-20 -translate-x-[200px] w-[400px] h-24 leading-[6rem] rounded-md text-xl bg-opacity-80 z-50;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translate3d(0, -100%, 0);
}
</style>
