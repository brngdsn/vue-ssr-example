export default {
  namespaced: true,
  state: () => {
    return {
      i: 0
    }
  },
  actions: {
    inc: ({ commit }) => commit('inc')
  },
  mutations: {
    inc: state => state.i++
  }
}
