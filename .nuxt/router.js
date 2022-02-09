import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _c3f129d8 = () => interopDefault(import('../pages/index2.vue' /* webpackChunkName: "pages/index2" */))
const _c3d4fad6 = () => interopDefault(import('../pages/index3.vue' /* webpackChunkName: "pages/index3" */))
const _ec31ebf2 = () => interopDefault(import('../pages/item.vue' /* webpackChunkName: "pages/item" */))
const _9770355e = () => interopDefault(import('../pages/itemH.vue' /* webpackChunkName: "pages/itemH" */))
const _628039b6 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _0518400e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/index2",
    component: _c3f129d8,
    name: "index2"
  }, {
    path: "/index3",
    component: _c3d4fad6,
    name: "index3"
  }, {
    path: "/item",
    component: _ec31ebf2,
    name: "item"
  }, {
    path: "/itemH",
    component: _9770355e,
    name: "itemH"
  }, {
    path: "/login",
    component: _628039b6,
    name: "login"
  }, {
    path: "/",
    component: _0518400e,
    name: "index"
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
