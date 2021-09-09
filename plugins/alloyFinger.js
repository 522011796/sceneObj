import Vue from 'vue'
import AlloyFinger from 'alloyfinger'
import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger_vue'

export default ({ app, store, req }) => {
  Vue.use(AlloyFingerPlugin,{
    AlloyFinger
  })
}
