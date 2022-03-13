import axios from './axios'

const getMoments = async (per_page=10,page=1,sortBy) => {
  return await axios.get("moment/?per_page=" + per_page + "&page=" + page + '&sortBy=' + sortBy)
}

const getFollowingMoments = async (per_page=10,page=1) => {
  return await axios.get("moment/following?per_page=" + per_page + "&page=" + page)
}

const getHotMoments = async () => {
  return await axios.get("moment/hot")
}

const getMomentDetail = async(id)=>{
  return await axios.get("moment/"+id)
}

const createMoment = async(params)=>{
  return await axios.post("moment",params)
}

export {
  getMoments,
  getFollowingMoments,
  getHotMoments,
  getMomentDetail,
  createMoment
}