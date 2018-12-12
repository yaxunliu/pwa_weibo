import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const { request } = require('../utils/fetchTool.js')

export default new Vuex.Store({
  state: { },
  mutations: { },
  actions: {
    async loadConfigList (context, callback) {
      let json = await request('https://m.weibo.cn/api/config/list')
      callback(json)
    },
    async loadContainerIndex (context, callback) {
      let json = await request('https://m.weibo.cn/api/container/getIndex?containerid=102803&openApp=0')
      callback(json)
    }
  }
})
