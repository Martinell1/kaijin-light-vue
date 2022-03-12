<template>
  <teleport to="body">
    <div class="model-wrapper" v-show="visible" @click="hide">
      <div @click.stop>
        <h1 class="text-center mb-4 text-2xl text-zinc-50">{{ title }}</h1>
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from 'vue';
defineProps({
  title: {
    type: String,
    default: ''
  }
})

const visible = ref(false)
const show = () => {
  visible.value = true
}

const hide = () => {
  visible.value = false
}

defineExpose({
  show,
  hide
})
</script>
<style scoped>
.model-wrapper {
  @apply fixed top-0 left-0 right-0 bottom-0 bg-zinc-500 bg-opacity-70 flex items-center justify-center;
}
</style>