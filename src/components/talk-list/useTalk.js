import {  nextTick, ref } from 'vue'
import { getTalks } from '@/api/talk'
export default function useTalk(){
  const talk_list = ref([])

  const talkInputRef = ref(null)

  const fetchTalks = async (articleId,rootTalkId) => {
    const { data: result } = await getTalks(articleId,rootTalkId);
    talk_list.value = result;   
  }

  const talkInputRefs = []
  const setInputRef = (el, id) => {
      talkInputRefs[id] = el
  }
  const talkHandle = async(id) => {
    console.log(id);
    console.log(talkInputRefs);
    talkInputRefs[id].shiftVisible()
  }

  const replyRefs = []
  const setReplyRef = (el, index) => {
    replyRefs.push(el)
  }

  return { talk_list, talkInputRef,replyRefs,talkInputRefs,setInputRef,talkHandle,setReplyRef,talkHandle, fetchTalks }
}