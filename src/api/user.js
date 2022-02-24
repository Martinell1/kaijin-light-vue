import axios from './axios'

const login = async (params) => {
  return await axios.post("user/login",params)
}

const getUserDetail = async(id,params)=>{
  return await axios.get("user/"+id+"?fields="+params)
}

const thumb = async(entity,id) => {
  return await axios.put("user/"+entity+"/"+id)
}

const unthumb = async(entity,id) => {
  return await axios.delete("user/"+entity+"/"+id)
}

export {
  login,
  getUserDetail,
  thumb,
  unthumb
}