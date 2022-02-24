import axios from './axios'

const login = async (params) => {
  return await axios.post("user/login",params)
}

const getUserDetail = async(id,params)=>{
  console.log(params);
  return await axios.get("user/"+id+"?fields="+params)
}

export {
  login,
  getUserDetail
}