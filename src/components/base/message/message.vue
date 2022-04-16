<template>
  <teleport to="#app">
    <transition name="slide-down">
      <div
        class="message"
        :class="{ 'message-success': type === 'SUCCESS', ' message-fail': type === 'FAIL', 'message-warn': type === 'WARN' }"
        @click="closeHandle"
      >
        <div class="text-center">{{ message }}</div>
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
  @apply fixed left-1/2 top-20 -translate-x-[300px] w-[600px] h-16 leading-[4rem] rounded-md z-50 truncate;
}

.message-success{
  background-color: #f0f9eb;
  color: #67c23a;
}

.message-fail{
  background-color: #fef0f0;
  color: #f56c6c;
}

.message-warn{
  background-color: #fdf6ec;
  color: #e6a23c;
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
