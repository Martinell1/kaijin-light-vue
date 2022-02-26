import axios from './axios'

const getTalks = async (articleId,rootTalkId,per_page=10,page=1) => {
  return await axios.get("article/"+articleId+"/talk?"+(rootTalkId?'rootTalkId='+rootTalkId+"&":'')+"per_page=" + per_page + "&page=" + page)
}

const doTalk = async (articleId,params) => {
  return await axios.post("article/"+articleId+"/talk",params)
}

export {
  getTalks,
  doTalk
}