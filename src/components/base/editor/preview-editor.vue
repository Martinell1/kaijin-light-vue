<template>
  <md-editor v-model="content" :previewOnly="true" style="background:transparent" />
</template>

<script setup>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
defineProps({
  content: ''
})
</script>