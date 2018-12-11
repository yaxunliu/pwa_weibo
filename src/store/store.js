import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const { request } = require('../utils/fetchTool.js')


export default new Vuex.Store({
  state: {
    configlist: [],
    hotWord: '',
  },

  mutations: {
    updateConfigList(state, json) {
      state.configlist = json.data.channel.map((obj) => {
        return { 'gid': obj.gid, 'name': obj.name }
      })
      state.hotWord = json.data.hot.hotWord
    }
  },

  actions: {
    async loadConfigList(context, callback) {
      let json = await request('https://m.weibo.cn/api/config/list')
      context.commit('updateConfigList', json)
      callback(json)
    }
  }
})
