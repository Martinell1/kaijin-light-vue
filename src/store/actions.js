import {getUserDetail} from '@/api/user'
import {FIELDS} from '@/js/constance'

export function logOut(){
  localStorage.removeItem('userInfo')
}


