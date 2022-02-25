import {  nextTick, ref } from 'vue'
import { getComments } from '@/api/comment'
export default function useComment(){
  const comment_list = ref([])

  const commentInputRef = ref(null)

  const fetchComments = async (questionId,answerId,rootCommentId) => {
    const { data: result } = await getComments(questionId, answerId,rootCommentId);
    comment_list.value = result;   
  }

  const commentInputRefs = []
  const setInputRef = (el, id) => {
      commentInputRefs[id] = el
  }
  const commentHandle = async(id) => {
    commentInputRefs[id].shiftVisible()
  }

  const replyRefs = []
  const setReplyRef = (el, index) => {
    replyRefs.push(el)
  }


  return { comment_list, commentInputRef,commentInputRefs,replyRefs,setReplyRef,setInputRef,commentHandle, fetchComments }
}