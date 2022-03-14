import axios from './axios'

const getArticles = async (per_page=10,page=1,q='') => {
  return await axios.get("article/?per_page=" + per_page + "&page=" + page + '&q=' + q)
}

const getHotArticles = async () => {
  return await axios.get("article/hot")
}

const getArticlesByFolow = async(per_page=10,page=1)=>{
  return await axios.get("article/following?per_page=" + per_page + "&page=" + page)
}

const getRecommandArticles = async(per_page=10,page=1)=>{
  return await axios.get("article/recommand?per_page=" + per_page + "&page=" + page)
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
  getHotArticles,
  getArticlesByFolow,
  getRecommandArticles,
  getArticleDetail,
  createArticle,
  updateArticle
}