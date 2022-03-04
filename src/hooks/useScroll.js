import { onMounted,onUnmounted, ref } from 'vue';

export default function useScroll(wrapper,fn,params){

  const clientH = document.documentElement.clientHeight
  const handleScroll =()=>{
    const scrollT = document.documentElement.scrollTop
    const scrollH = document.documentElement.scrollHeight
    if(scrollT + clientH >= scrollH){
      fn(params)
    }
  }

  onMounted(()=>{
    window.addEventListener("scroll", handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll)
  })
}
