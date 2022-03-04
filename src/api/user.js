import axios from './axios'

const login = async (params) => {
  return await axios.post("user/login",params)
}

const register = async (params) => {
  return await axios.post("user",params)
}

const getUsers = async (per_page=10,page=1,q='') => {
  return await axios.get("user/?per_page=" + per_page + "&page=" + page + '&q=' + q)
}

const getUserDetail = async(id,params)=>{
  return await axios.get("user/"+id+"?fields="+params)
}

const getFollowings = async(id)=>{
  return await axios.get("user/"+id+"/followings")
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

const updateUser = async(id,params)=>{
  return await axios.patch("user/"+id,params)
}

export {
  login,
  register,
  getUsers,
  getUserDetail,
  getFollowings,
  getFollowers,
  getArticles,
  getQuestions,
  getAnswers,
  thumb,
  unthumb,
  follow,
  unfollow,
  updateUser
}