export function setLocal(field,list){
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  userInfo[field] = list
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

const useContentTypeHandle = () => {
  const field = "liking" + props.content_type + 's'
  const fn = 'setLiking' + props.content_type + 's'
  return { field, fn }
}