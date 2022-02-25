import axios from './axios'

const getAnswers = async (id,per_page=10,page=1) => {
  return await axios.get("/question/"+id+"/answer?per_page=" + per_page + "&page=" + page)
}

const doAnswer = async (id,params) => {
  return await axios.post("/question/"+id+"/answer",params)
}

const updateAnswer = async (questionId,answerId,params)=>{
  return await axios.patch("/question/"+questionId+"/answer/"+answerId,params)
}


export {
  getAnswers,
  doAnswer,
  updateAnswer
}