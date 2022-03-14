import axios from './axios'

const getNewss = async (per_page=10,page=1,q='') => {
  return await axios.get("news/?per_page=" + per_page + "&page=" + page + '&q=' + q)
}

const getHotNewss = async () => {
  return await axios.get("news/hot")
}

const getNewsDetail = async(id)=>{
  return await axios.get("news/"+id)
}

const updateNews = async(id,params)=>{
  return await axios.patch("news/"+id,params)
}



export {
  getNewss,
  getHotNewss,
  getNewsDetail,
  updateNews
}