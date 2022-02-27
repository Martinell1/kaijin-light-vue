import { ref } from 'vue';
import { getQuestions,getQuestionDetail } from '@/api/question'
import { getAnswers } from '@/api/answer'
export default function useQuestion(){
  //问题列表
  const question_list = ref([])

  const fetchQuestions = async (per_page, page) => {
    const { data: result } = await getQuestions(per_page, page)
    question_list.value = [...question_list.value, ...result]
  }

  //问题详情
  const question_detail = ref({})
  const fetchQuestionDetail = async (id) => {
    const { data: result } = await getQuestionDetail(id)
    question_detail.value = result
  }

  //回答列表
  const answer_list = ref([])

  const fetchAnswers = async (id) => {
    const { data: result } = await getAnswers(id)
    answer_list.value = [...answer_list.value, ...result]
  }

  return { question_list,question_detail,answer_list, fetchQuestions, fetchQuestionDetail, fetchAnswers }
}
