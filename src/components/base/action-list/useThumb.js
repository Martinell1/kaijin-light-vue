import { thumb, unthumb } from '@/api/user';
import { setLocal } from '@/js/user-store'
import {computed,inject} from 'vue'
import { useStore } from 'vuex';

export default function useThumb(){
  const store = useStore()
  const userInfo = computed(()=> store.state.userInfo)

  const useMessage = inject('useMessage')

  const thumbHandle = async(item,content_type)=>{
    let id = item._id
    const { field, fn } = useContentTypeHandle(content_type)
    console.log(userInfo.value,field);
    let list = userInfo.value[field]?.slice()
    let index = list?.indexOf(id)
    if (index > -1) {
      await unthumb(field, id)
      list.splice(index, 1)
      item.voteCount--
      useMessage('SUCCESS', '取消点赞成功', 2000)
    } else {
      await thumb(field, id)
      list.push(id)
      item.voteCount++
      useMessage('SUCCESS', '点赞成功', 2000)
    }
    store.commit(fn, list)
    setLocal(field, list)
  }

  const useContentTypeHandle = (content_type) => {
    content_type = content_type.replace(content_type[0],content_type[0].toUpperCase())
    const field = "liking" + content_type + 's'
    const fn = 'setLiking' + content_type + 's'
    return { field, fn }
  }

  return {thumbHandle}
}


