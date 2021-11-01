import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_44cde154 from 'nuxt_plugin_plugin_44cde154' // Source: ./components/plugin.js (mode: 'all')
import nuxt_plugin_bootstrapvue_097884ca from 'nuxt_plugin_bootstrapvue_097884ca' // Source: ./bootstrap-vue.js (mode: 'all')
import nuxt_plugin_axios_4d070b6c from 'nuxt_plugin_axios_4d070b6c' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_vuecookies_6b36a0a5 from 'nuxt_plugin_vuecookies_6b36a0a5' // Source: ../plugins/vue-cookies.js (mode: 'client')
import nuxt_plugin_polyfill_445bbb12 from 'nuxt_plugin_polyfill_445bbb12' // Source: ../plugins/polyfill.js (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    return this.$root.$options.$nuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule
const baseStoreOptions = { preserveState: process.client }

function registerModule (path, rawModule, options = {}) {
  return originalRegisterModule.call(this, path, rawModule, { ...baseStoreOptions, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"htmlAttrs":{"lang":"en"},"title":"Do Something nearby. Get out, mask up, and support King County businesses.","__dangerouslyDisableSanitizers":["script"],"script":[{"hid":"versatag-script","innerHTML":"(function (e, s, t) { t = t || {}, t.id = e, versaTagObj = { $: [], onready: function(e) { this.$.push(e) } }; var n = s.getElementsByTagName(\"script\")[0], r = s.createElement(\"script\"); r.options = t, r.async = !0, r.src = \"https:\u002F\u002Fsecure-ds.serving-sys.com\u002FSemiCachedScripts\u002FebOneTag.js?id=\" + e, r.options = t, n.parentNode.insertBefore(r, n)    })(\"1073745552\", document, { dataLayer:\"SizmekDataLayer\"    });","type":"text\u002Fjavascript","charset":"utf-8"},{"hid":"gtm-script","async":true,"src":"https:\u002F\u002Fwww.googletagmanager.com\u002Fgtag\u002Fjs?id=G-FFGLWC0KDC"},{"hid":"gtm-script-content","innerHTML":"window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-FFGLWC0KDC');"}],"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"    King County businesses need your support. So, find a new favorite and get out there, mask up, and Do Something. For yourself and for your community."},{"property":"og:title","content":"Do something fun nearby","hid":"og:title"},{"property":"og:description","content":"Find new favorites and support local businesses while you’re at it.","hid":"og:description"},{"property":"og:image","content":"https:\u002F\u002Fdosomethingnearby.org\u002Fassets\u002FVS_DoSomething_Share.jpg","hid":"og:image"},{"property":"og:url","content":"https:\u002F\u002Fdosomethingnearby.org","hid":"og:url"},{"property":"og:type","content":"website","hid":"og:type"},{"name":"twitter:card","content":"summary_large_image","hid":"twitter:card"},{"name":"twitter:site","content":"@VisitSeattle","hid":"twitter:site"},{"name":"twitter:title","content":"Do Something Nearby","hid":"twitter:title"},{"name":"twitter:description","content":"I found some fun things to do nearby. Check them out! ","hid":"twitter:description"},{"name":"twitter:image","content":"https:\u002F\u002Fdosomethingnearby.org\u002Fassets\u002FVS_DoSomething_Share.jpg","hid":"twitter:image"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon\u002Ffavicon.ico"},{"rel":"icon","type":"image\u002Fpng","sizes":"16x16","href":"\u002Ffavicon\u002Ffavicon-16x16.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"32x32","href":"\u002Ffavicon\u002Ffavicon-32x32.png"},{"rel":"icon","type":"apple-touch-icon-precomposed","sizes":"180x180","href":"\u002Ffavicon\u002Fapple-touch-icon.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"192x192","href":"\u002Ffavicon\u002Fandroid-chrome-192x192.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"512x512","href":"\u002Ffavicon\u002Fandroid-chrome-512x512.png"}],"style":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_44cde154 === 'function') {
    await nuxt_plugin_plugin_44cde154(app.context, inject)
  }

  if (typeof nuxt_plugin_bootstrapvue_097884ca === 'function') {
    await nuxt_plugin_bootstrapvue_097884ca(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_4d070b6c === 'function') {
    await nuxt_plugin_axios_4d070b6c(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuecookies_6b36a0a5 === 'function') {
    await nuxt_plugin_vuecookies_6b36a0a5(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_polyfill_445bbb12 === 'function') {
    await nuxt_plugin_polyfill_445bbb12(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, (err) => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err)
        if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
