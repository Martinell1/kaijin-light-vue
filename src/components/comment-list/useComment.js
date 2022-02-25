import { ref } from 'vue'
import { getComments } from '@/api/comment'
export default function useComment(){
  const comment_list = ref([])

  const commentInputRef = ref(null)

  const fetchComments = async (questionId,answerId,rootCommentId) => {
    const { data: result } = await getComments(questionId, answerId,rootCommentId);
    comment_list.value = result;
  }

  const commentInputRefs = []
  const setItemRef = (el, index) => {
    if (el) {
      commentInputRefs.push(el)
    }
}
  const commentHandle = (index) => {
    commentInputRefs[index].shiftVisible()
  }

  return { comment_list, commentInputRef,commentInputRefs,setItemRef,commentHandle, fetchComments }
}