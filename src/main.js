// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Buefy from 'buefy'
import App from './App'

import { createStore } from './store'
import { createRouter } from './router'

import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

Vue.use(Buefy)

Vue.mixin({
  beforeMount () {
    const { asyncData } = this.$options
    if (asyncData) {
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$router
      })
    }
  }
})

Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

export function createApp () {
  const store = createStore()
  const router = createRouter()

  sync(store, router)

  /* eslint-disable no-new */
  const app = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })

  return { app, router, store }
}
