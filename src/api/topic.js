import axios from './axios'

const getTopics = async (q='') => {
  return await axios.get("topic?per_page=9999&page=1&q=" + q)
}


export {
  getTopics,
}