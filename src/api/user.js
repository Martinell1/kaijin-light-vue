import axios from './axios'

const login = async (params) => {
  return await axios.post("user/login",params)
}

const getUserDetail = async(id,params)=>{
  return await axios.get("user/"+id+"?fields="+params)
}

const getFollowers = async(id)=>{
  return await axios.get("user/"+id+"/followers")
}

const getArticles = async(id)=>{
  return await axios.get("user/"+id+"/articles")
}

const getQuestions = async(id)=>{
  return await axios.get("user/"+id+"/questions")
}

const getAnswers = async(id)=>{
  return await axios.get("user/"+id+"/answers")
}


const thumb = async(field,id) => {
  return await axios.put("user/"+field+"/"+id)
}

const unthumb = async(field,id) => {
  return await axios.delete("user/"+field+"/"+id)
}

const follow = async(field,id)=>{
  return await axios.put("user/"+field+"/"+id)
}

const unfollow = async(field,id)=>{
  return await axios.delete("user/"+field+"/"+id)
}

export {
  login,
  getUserDetail,
  getFollowers,
  getArticles,
  getQuestions,
  getAnswers,
  thumb,
  unthumb,
  follow,
  unfollow
}