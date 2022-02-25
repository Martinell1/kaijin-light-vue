import axios from './axios'

const getComments = async (questionId,answerId,rootCommentId,per_page=10,page=1) => {
  return await axios.get("question/"+questionId+"/answer/"+answerId+"/comment?"+(rootCommentId?'rootCommentId='+rootCommentId+"&":'')+"per_page=" + per_page + "&page=" + page)
}

const doComment = async (questionId,answerId,params) => {
  return await axios.post("question/"+questionId+"/answer/"+answerId+"/comment",params)
}

export {
  getComments,
  doComment
}