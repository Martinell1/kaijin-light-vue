import { ref } from 'vue';
import { getResources,getResourceDetail,getHotResource } from '@/api/resource'
export default function useResource(){
  //问题列表
  const resource_list = ref([])
  let page = 1
  const fetchResources = async (per_page,q) => {
    const { data: result } = await getResources(per_page, page++,q)
    resource_list.value = [...resource_list.value, ...result]
  }

  const setResourcePage = ()=>{
    page = 1
    resource_list.value = []
  }

  //问题详情
  const resource_detail = ref({})
  const fetchResourceDetail = async (id) => {
    const { data: result } = await getResourceDetail(id)
    resource_detail.value = result
  }

  const hot_resources = ref([])
  const fetchHotResource = async (per_page,q) => {
    const { data: result } = await getHotResource(per_page, page++,q)
    hot_resources.value = [...hot_resources.value, ...result]
  }

  return { resource_list,resource_detail,hot_resources, fetchResources, fetchResourceDetail,fetchHotResource,setResourcePage }
}
