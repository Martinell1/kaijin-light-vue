export function setLocal(field,list){
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  userInfo[field] = list
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

