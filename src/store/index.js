import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

const types = {
  LIST_RESOURCE: 'LIST_RESOURCE'
}

const api = {
  async get (url) {
    return Vue.http.get(url)
      .then(r => Promise.resolve(r))
      .catch(e => Promise.reject(e))
  }
}

export function createStore () {
  return new Vuex.Store({
    state: {},
    getters: {},
    mutations: {
      [types.LIST_RESOURCE] (state, resource) {
        state[resource.prop] = resource.body
      }
    },
    actions: {
      async listResource ({commit}, config) {
        return api.get(config.url)
          .then(({body}) => commit(types.LIST_RESOURCE, {
            body: body,
            prop: config.prop
          }))
          .catch(e => Promise.reject(e))
      }
    }
  })
}
