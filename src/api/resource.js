import axios from './axios'

const getResources = async (per_page=10,page=1,q='') => {
  return await axios.get("resource/?per_page=" + per_page + "&page=" + page + '&q=' + q)
}

const getHotResource = async () => {
  return await axios.get("resource/hot")
}

const downloadResource = async(id)=>{
  return await axios.post("resource/download/"+id)
}

const getResourceDetail = async(id)=>{
  return await axios.get("resource/"+id)
}

const createResource = async(params)=>{
  return await axios.post("resource",params)
}

const updateResource = async(id,params)=>{
  return await axios.patch("resource/"+id,params)
}



export {
  getResources,
  getHotResource,
  downloadResource,
  getResourceDetail,
  createResource,
  updateResource
}