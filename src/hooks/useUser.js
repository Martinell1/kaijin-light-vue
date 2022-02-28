import { ref } from 'vue';
import { getUserDetail, getFollowers,getArticles,getQuestions,getAnswers,getFollowings,updateUser } from '@/api/user'
import { FIELDS } from '@/js/constance'
import { useStore } from 'vuex';
import { setLocal } from '../js/user-store';
export default function useQuestion(){
  const store = useStore()
  //用户详情
  const user_detail = ref({})
  const fetchUserDetail = async (id) => {
    const { data: result } = await getUserDetail(id, FIELDS)
    user_detail.value = result
  }

  const question_list = ref([])
  const fetchQuestions = async (id) => {
    const { data: result } = await getQuestions(id)
    question_list.value = result
  }

  const answer_list = ref([])
  const fetchAnswers = async (id) => {
    const { data: result } = await getAnswers(id)
    answer_list.value = result
  }

  const article_list = ref([])
  const fetchArticles = async (id) => {
    const { data: result } = await getArticles(id)
    article_list.value = result
  }

  const following_list = ref([])
  const fetchFollowings = async (id) => {
    const { data: result } = await getFollowings(id)
    following_list.value = result
  }

  const follower_list = ref([])
  const fetchFollowers = async (id) => {
    const { data: result } = await getFollowers(id)
    follower_list.value = result
  }

  const modifyUser = async(field,id,params)=>{
    const { data: result } = await updateUser(id,params)
    setLocal(field,params[field])
  }

  return { user_detail,question_list,answer_list,article_list,follower_list,following_list,
    fetchUserDetail,fetchQuestions,fetchAnswers,fetchArticles,fetchFollowers,fetchFollowings
    ,modifyUser }
}
