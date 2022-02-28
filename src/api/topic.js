import axios from './axios'

const getTopics = async (per_page=10,page=1) => {
  return await axios.get("topic/?per_page=" + per_page + "&page=" + page)
}

export {
  getTopics,
}