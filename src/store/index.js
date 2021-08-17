import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || null)
  },
  mutations: {
    setUser (state, payload) {
      // 将JSON数据转换成对象数据
      state.user = JSON.parse(payload)
      // 本地存储vuex数据
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
