<template>
    <div ref="scrollRef" class="shadow rounded bg-zinc-50 w-[800px]">
        <div v-for="(item, index) in datas" :key="item._id">
            <router-link
                :to="{ name: 'NewsDetail', params: { id: item._id } }"
                class="px-6 flex items-center h-[250px]"
            >
                <div :class="{ 'order-1': index % 2 === 0 }">
                    <h2 class="font-black text-lg text-rose-500 mb-2 text-center">{{ item.title }}</h2>
                    <div class="w-[350px] h-[200px]">
                        <img
                            v-if="item.avatar_url"
                            :src="item.avatar_url"
                            class="object-cover h-full w-full rounded"
                        />
                    </div>
                </div>
                <div class="w-full h-full flex flex-col justify-center items-center text-sm">
                    <div class="text-stone-500 mb-2">{{ fmtMarkDown(item.description) }}</div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import useScroll from '../../hooks/useScroll';
import { fmtMarkDown } from '../../js/utils'
const props = defineProps({
    datas: {
        type: Array,
        default: []
    },
    fetchFn: {
        type: Function,
        default: () => {
            return
        }
    }
})

const scrollRef = ref(null)
useScroll(scrollRef, props.fetchFn)

</script>
<style scoped>
</style>