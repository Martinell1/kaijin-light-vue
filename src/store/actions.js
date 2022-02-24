export function setUserInfo ({ commit, state }, userInfo) {
  commit('setUserInfo',userInfo)
  localStorage.setItem("userInfo", JSON.stringify(userInfo))
}