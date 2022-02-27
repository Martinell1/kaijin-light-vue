import {getUserDetail} from '@/api/user'
import {FIELDS} from '@/js/constance'
export async function fetchUserInfo ({ commit, state }, id) {

  const { data: userInfo } = await getUserDetail(id, FIELDS)
  commit('setUserInfo',userInfo)
  localStorage.setItem('userInfo',JSON.stringify(userInfo))
}


