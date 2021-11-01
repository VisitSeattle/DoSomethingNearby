import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ac483612 = () => interopDefault(import('../pages/favorites.vue' /* webpackChunkName: "pages/favorites" */))
const _742c2596 = () => interopDefault(import('../pages/import.vue' /* webpackChunkName: "pages/import" */))
const _463a7416 = () => interopDefault(import('../pages/shared.vue' /* webpackChunkName: "pages/shared" */))
const _4df8f1f2 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/favorites",
    component: _ac483612,
    name: "favorites"
  }, {
    path: "/import",
    component: _742c2596,
    name: "import"
  }, {
    path: "/shared",
    component: _463a7416,
    name: "shared"
  }, {
    path: "/",
    component: _4df8f1f2,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
