import axios from './axios'

const getArticles = async (per_page=10,page=1) => {
  return await axios.get("article/?per_page=" + per_page + "&page=" + page)
}

const getArticleDetail = async(id)=>{
  return await axios.get("article/"+id)
}


export {
  getArticles,
  getArticleDetail
}