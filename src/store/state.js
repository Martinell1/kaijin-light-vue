const state = {
  userInfo:load('userInfo')
}

export default state

function load(str){
  return JSON.parse(localStorage.getItem(str))
}