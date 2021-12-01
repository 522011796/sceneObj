import Vue from 'vue'
import Toast from "./toast";

export default {
  install(Vue, defaultOptions = {}) {
    const CONSTRUCTOR = Vue.extend(Toast)
    const CACHE = {}
    Object.assign(Toast.DEFAULT_OPT, defaultOptions)

    function toast(msg, options = {}) {
      options.message = msg
      let toast = CACHE[options.id] || (CACHE[options.id] = new CONSTRUCTOR)
      if (!toast.$el && process.client) {
        let vm = toast.$mount()
        document.body.appendChild(vm.$el)
      }
      toast.queue.push(options)
    }
    Vue.toast = Vue.prototype.$toast = toast
  }
}
