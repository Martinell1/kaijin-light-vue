import { createApp } from 'vue'
function addClass (el, className) {
  if (el.classList.contains(className)) {
    el.classList.add(className)
  }
}

function removeClass (el, className) {
  el.classList.remove(className)
}
const message_list = []
export default function createMessageComponent (Comp,type,message,delay) {
  
  
  const app = createApp(Comp)// 根据模板创建app
  // 将app挂载在div上
  // instance 可获取实例上暴露的方法 setup语法中需要defineExpose
  const instance = app.mount(document.createElement('div'))
  message_list.push(instance)
  instance.setMessage(type,message,message_list.length)
  setTimeout(() => {
    app.unmount(instance)
    message_list.shift()
  }, delay);
}


  
// return {
//   mounted (el, binding) {
//     const app = createApp(Comp)// 根据模板创建app
//     console.log('app',app);
//     // 将app挂载在div上
//     // instance 可获取实例上暴露的方法 setup语法中需要defineExpose
//     const instance = app.mount(document.createElement('div'))

//     // el  该指令的挂载对象
//     // name 标识
//     if (!el[name]) {
//       el[name] = {}
//     }

//     el[name].instance = instance
//     const title = binding.arg

//     if (typeof title !== 'undefined') {
//       instance.setTitle(title)
//     }
//     if (binding.value) {
//       append(el)
//     }
//   },

//   updated (el, binding) {
//     const title = binding.arg
//     if (typeof title !== 'undefined') {
//       el[name].instance.setTitle(title)
//     }
//     if (binding.value !== binding.oldValue) {
//       binding.value ? append(el) : remove(el)
//     }
//   }
// }
// function append (el) {
//   const style = getComputedStyle(el)
//   if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
//     addClass(el, relativeClass)
//   }
//   el.appendChild(el[name].instance.$el)
// }

// function remove (el) {
//   removeClass(el, relativeClass)
//   el.removeChild(el[name].instance.$el)
// }
