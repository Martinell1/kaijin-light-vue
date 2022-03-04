import axios from './axios'

const getTopics = async (q='') => {
  return await axios.get("topic?q=" + q)
}


export {
  getTopics,
}