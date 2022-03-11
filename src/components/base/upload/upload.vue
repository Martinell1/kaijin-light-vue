<template>
    <div>
        <label for="upload" class="w-40 h-40 absolute block"></label>
        <input
            ref="uploadRef"
            id="upload"
            type="file"
            class="hidden"
            @change="onChangeHandle"
            multiple="true"
            enctype="multipart/form-data"
            accept="image/*"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import useUpload from './useUpload'
const { fetchToken, uploadToQiniu } = useUpload()
const uploadRef = ref(null)
const url = ref('')
const emit = defineEmits(['onUpload'])
const onChangeHandle = async () => {
    const file = uploadRef.value.files[0];
    let token = await fetchToken()
    if (token) {
        const form = new FormData();
        form.append("token", token)
        form.append("file", file)
        url.value = await uploadToQiniu(form)
        emit('onUpload', url.value)
    }
}
</script>