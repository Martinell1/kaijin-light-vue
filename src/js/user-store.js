export function setLocal(field,data){
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  userInfo[field] = data
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}


