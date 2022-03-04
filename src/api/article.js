import axios from './axios'

const getArticles = async (per_page=10,page=1,q='') => {
  console.log(page);
  return await axios.get("article/?per_page=" + per_page + "&page=" + page + '&q=' + q)
}

const getArticleDetail = async(id)=>{
  return await axios.get("article/"+id)
}

const createArticle = async(params)=>{
  return await axios.post("article",params)
}

const updateArticle = async(id,params)=>{
  return await axios.patch("article/"+id,params)
}



export {
  getArticles,
  getArticleDetail,
  createArticle,
  updateArticle
}