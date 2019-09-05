import vuex from '@wepy/x'

export default new vuex.Store({
  state: {
    x_userInfo: [],
    x_defaultMenu: 0,
    x_openid: null,
    x_menuList: []
  },
  mutations: {
    upList (state) {
      // state.list = ['1', 2, 3]
      // state.default = 2
      // state.default = result.default
    }
  },
  actions: {
    upList ({ commit }) {
      commit('upList')
    }
  }
})
