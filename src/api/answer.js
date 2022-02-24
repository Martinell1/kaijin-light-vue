import axios from './axios'

const getAnswers = async (id,per_page=10,page=1) => {
  return await axios.get("/question/"+id+"/answer?per_page=" + per_page + "&page=" + page)
}


export {
  getAnswers
}