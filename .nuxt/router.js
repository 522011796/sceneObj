import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _fa4315ee = () => interopDefault(import('../pages/index3.vue' /* webpackChunkName: "pages/index3" */))
const _2572097b = () => interopDefault(import('../pages/item.vue' /* webpackChunkName: "pages/item" */))
const _ebc65746 = () => interopDefault(import('../pages/itemH.vue' /* webpackChunkName: "pages/itemH" */))
const _b6d65b9e = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/index3",
    component: _fa4315ee,
    name: "index3"
  }, {
    path: "/item",
    component: _2572097b,
    name: "item"
  }, {
    path: "/itemH",
    component: _ebc65746,
    name: "itemH"
  }, {
    path: "/login",
    component: _b6d65b9e,
    name: "login"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
