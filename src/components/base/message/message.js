import createMessageComponent from './create-message'
import Message from './message.vue'
import {h,render} from 'vue'

export default {
  install: (app) => {
    const useMessage = (type,message,delay)=>{
      createMessageComponent(Message,type,message,delay)
    }
    app.provide('useMessage',useMessage)
  }
}