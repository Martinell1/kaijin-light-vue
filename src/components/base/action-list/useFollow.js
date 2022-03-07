import { follow, unfollow } from '@/api/user';
import { setLocal } from '@/js/user-store'
import {computed,inject} from 'vue'
import { useStore } from 'vuex';


export default function useFollow(){
  const store = useStore()
  const userInfo = computed(()=> store.state.userInfo)

  const useMessage = inject('useMessage')

  const followHandle = async(item,content_type)=>{
    let id = item._id
    const { field, fn } = useContentTypeHandle(content_type)
    let list = userInfo.value[field].slice()
    let index = list.indexOf(id)
    if (index > -1) {
      await unfollow(field, id)
      list.splice(index, 1)
      useMessage('SUCCESS', '取关成功', 2000)
    } else {
      await follow(field, id)
      list.push(id)
      useMessage('SUCCESS', '关注成功', 2000)
    }
    store.commit(fn, list)
    setLocal(field, list)
  }

  const useContentTypeHandle = (content_type) => {
    const field = "following" + content_type + 's'
    const fn = 'setFollowing' + content_type + 's'
    return { field, fn }
  }

  return {followHandle}
}


