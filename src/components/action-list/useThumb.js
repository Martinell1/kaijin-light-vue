import { thumb, unthumb } from '@/api/user';
import { setLocal } from '@/js/user-store'
import {computed} from 'vue'
import { useStore } from 'vuex';

export default function useThumb(){
  const store = useStore()
  const userInfo = computed(()=> store.state.userInfo)

  const thumbHandle = async(item,content_type)=>{
    let id = item._id
    const { field, fn } = useContentTypeHandle(content_type)
    let list = userInfo.value[field].slice()
    let index = list.indexOf(id)
    if (index > -1) {
      await unthumb(field, id)
      list.splice(index, 1)
      item.voteCount--
    } else {
      await thumb(field, id)
      list.push(id)
      item.voteCount++
    }
    store.commit(fn, list)
    setLocal(field, list)
  }

  const useContentTypeHandle = (content_type) => {
    const field = "liking" + content_type + 's'
    const fn = 'setLiking' + content_type + 's'
    return { field, fn }
  }

  return {thumbHandle}
}


