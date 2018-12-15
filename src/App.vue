<template>
  <div id="app">
    <navtop :configList="configList" :hot="hot" @changeSelect="changeSelect"></navtop>
    <router-view></router-view>
  </div>
</template>

<script>
import Navtop from './components/navtop/navtop'
const { loadConfigList } = require('./utils/fechData')

export default {
  name: 'App',
  data () {
    return {
      configList: [],
      hot: ''
    }
  },
  methods: {
    _loadConfiglist: async function () {
      let result = await loadConfigList()
      this.configList = result.data.channel
      this.hot = result.data.hot.hotWord
      let gid = this.configList[0].gid
      gid && this.$router.push({ name: 'home', query: { id: gid }})
    },
    changeSelect: function (index) {
      let gid = this.configList[index].gid
      gid && this.$router.push({ name: 'home', query: { id: gid }})
    }
  },
  mounted: function () {
    this._loadConfiglist()
  },
  components: {
    Navtop
  }
}
</script>

<style lang="stylus">
#app
  width 100%
  background-color #f2f2f2
  padding-top 5.7rem
  box-sizing border-box
  height 100%
</style>
