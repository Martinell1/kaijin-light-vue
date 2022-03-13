import { ref,inject } from "vue"
import { createMoment, getMoments,getFollowingMoments } from '@/api/moment'
export default function useMoment(){

  const useMessage = inject('useMessage')
  const moment_detail = ref({
    content: '',
    imgs: []
  })

  const publicMoment = async () => {
    const { data: result } = await createMoment(moment_detail.value)
    if (result) {
      useMessage('SUCCESS', '发布成功', 2000)
    }
  }

  const moment_list = ref([])
  let page = 1
  const fetchMoments = async (per_page) => {
    const { data: result } = await getMoments(per_page, page++)
    moment_list.value = [...moment_list.value, ...result]
  }

  const fetchMomentsBySort = async (per_page,sortBy) => {
    const { data: result } = await getMoments(per_page, page++,sortBy)
    moment_list.value = [...moment_list.value, ...result]
  }

  const fetchFollowingMoments = async (per_page) => {
    const { data: result } = await getFollowingMoments(per_page, page++)
    console.log(result);
    console.log(moment_list.value);
    moment_list.value = [...moment_list.value, ...result]
    console.log(moment_list.value);
  }

  const setPage = ()=>{
    moment_list.value = []
    page = 1
  }

  return { moment_detail, moment_list, publicMoment, fetchMoments,setPage,fetchMomentsBySort,fetchFollowingMoments }
  
}