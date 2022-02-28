import {getUserDetail} from '@/api/user'
import {FIELDS} from '@/js/constance'
import { useRouter } from 'vue-router'
export async function fetchUserInfo ({ commit, state }, id) {
  const { data: userInfo } = await getUserDetail(id, FIELDS)
  console.log('执行');
  commit('setUserInfo',userInfo)
  localStorage.setItem('userInfo',JSON.stringify(userInfo))
 
}

export function logOut({commit,state}){
  localStorage.removeItem('userInfo')
}


