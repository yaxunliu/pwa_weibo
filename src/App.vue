<template>
  <div id="app">
    <Navtop></Navtop>
  </div>
</template>

<script>
import Navtop from './components/navtop/navtop'

export default {
  name: 'App',
  mounted: function () {
    window.onresize = function () {
      let width = document.body.clientWidth
      let fontSize = 0
      if (width < 518) { // 小
        fontSize = 18
      } else if (width < 960) { // 中
        fontSize = 20
      } else { // 大
        fontSize = 23
      }
      if (document.documentElement.style.fontSize === fontSize) { return }
      document.documentElement.style.fontSize = fontSize + 'px'
    }
  },
  components: {
    Navtop
  }
}

</script>

<style lang="stylus">
  #app
    width 100%
    background-color blue

</style>
