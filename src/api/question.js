import axios from './axios'

const getQuestions = async (per_page=10,page=1) => {
  return await axios.get("question/?per_page=" + per_page + "&page=" + page)
}

const getQuestionDetail = async(id)=>{
  return await axios.get("question/"+id)
}


export {
  getQuestions,
  getQuestionDetail
}