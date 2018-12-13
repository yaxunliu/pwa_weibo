<template>
  <div id="app">
    <navtop :configList="configList" :hot="hot"></navtop>
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
