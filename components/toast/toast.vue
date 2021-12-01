<template>
  <transition :name="mergedOption.transition">
    <div
      :id="mergedOption.id"
      class="et-wrapper"
      :class="clazz"
      :transition="mergedOption.transition"
      v-show="showing"
    >
      <span class="et-content" v-html="mergedOption.message"></span>
      <a class="et-close" v-if="mergedOption.closeable" v-on:click="close()">&times;</a>
    </div>
  </transition>
</template>
<style>
.et-wrapper {
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  padding: 10px 30px;
  display: inline-block;
  white-space: nowrap; text-overflow: ellipsis; overflow: hidden;
  max-width: 300px;
  min-width: 120px;
  color: white;
  z-index: 9999;
  margin: auto;
  text-align: center;
}
.et-wrapper {
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);
}
.et-content {
  text-align: center;
}
.et-wrapper .et-close {
  position: absolute;
  top: 0;
  right: 5px;
  color: white;
}
.et-wrapper.et-bottom{
  top: 80%;
}
.et-wrapper.et-center {
  top: 50%;
}
.et-wrapper.et-alert {
  background-color: rgba(189, 19, 19, 0.7);
}
.et-wrapper.et-warn {
  background-color: rgba(250, 180 ,90 ,0.9);
}
.et-wrapper.et-info {
  background-color: rgba(32, 83, 201, 0.7);
}
.fade-enter-active,
.fade-leave-active,
.fade-transition {
  -webkit-transition: opacity .3s ease;
  transition: opacity .3s ease;
}
.fade-enter,
.fade-leave,
.fade-leave-active {
  opacity: 0;
}
.slide-down-enter-active,
.slide-down-leave-active,
.slide-down-transition {
  -webkit-transition: opacity .3s ease, top .3s ease-in;
  transition: opacity .3s ease, top .3s ease-in;
}
.slide-down-leave-active,
.slide-down-enter,
.slide-down-leave {
  opacity: 0;
  top: -10% !important;
}
.slide-up-enter-active,
.slide-up-leave-active,
.slide-up-transition {
  -webkit-transition: opacity .3s ease, top .3s ease-in;
  transition: opacity .3s ease, top .3s ease-in;
}
.slide-up-leave-active,
.slide-up-enter,
.slide-up-leave {
  opacity: 0;
  top: 110% !important;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-left-transition {
  -webkit-transition: opacity .3s ease, left .3s ease-in;
  transition: opacity .3s ease, left .3s ease-in;
}
.slide-left-leave-active,
.slide-left-enter,
.slide-left-leave {
  opacity: 0;
  left: 110% !important;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-right-transition {
  -webkit-transition: opacity .3s ease, left .3s ease;
  transition: opacity .3s ease, left .3s ease;
}
.slide-right-leave-active,
.slide-right-enter,
.slide-right-leave {
  opacity: 0;
  left: -1000px !important;
}
</style>
<script>
import Vue from 'vue'

const DEFAULT_OPT = {
  id: 'toast-default',
  className: '',
  toastPosition: 'center', // center, bottom
  parent: 'body',
  transition: 'fade',
  duration: 1800,
  message: '',
  closeable: false
}
export default {
  name: 'Toast',
  DEFAULT_OPT: DEFAULT_OPT,
  data() {
    return {
      queue: [],
      option: {},
      showing: false,
    }
  },
  computed: {
    mergedOption: function() {
      return Object.assign({}, DEFAULT_OPT, this.option)
    },
    clazz: function() {
      let clazz = []
      let className = this.option.className
      let toastPosition = this.mergedOption.toastPosition
      let closeable = this.mergedOption.closeable

      if(className){
        if(typeof className === 'string'){
          clazz.push(className)
        }
        if(Array.isArray(className)){
          clazz = clazz.concat(className)
        }
      }
      if(toastPosition){
        clazz.push(`et-${toastPosition}`)
      }
      if(closeable) {
        clazz.push('et-closeable')
      }
      return clazz.join(' ')
    }
  },
  methods: {
    close: function() {
      this.showing = false;
      this.queue.shift();
    }
  },
  watch: {
    queue: function() {
      let pending = this.queue.length
      if (pending === 0) {
        return
      }
      this.showing = true
      this.option = this.queue[0]

      if ((!this.option.mode || this.option.mode === 'override') && pending > 1) {
        clearTimeout(this.timeoutId)
        this.showing = false
        this.timeoutId = null
        this.timeoutId = setTimeout(() => this.queue.shift())
      } else {
        this.timeoutId = setTimeout(() => {
          this.showing = false
          this.timeoutId = null
          setTimeout(() => this.queue.shift())
        }, this.mergedOption.duration)
      }
    }
  }
}
</script>
