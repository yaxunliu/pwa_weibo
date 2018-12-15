<template>
  <div class="refresh-header">
    <i class="refresh-icon"><img :class="{ 'img-arrow-down': status === 0, 'img-arrow-up': status === 1, 'img-roating': status === 2 }" :src="_tipImgSrc"/></i>
    <span class="refresh-text">{{ _tipText }}</span>
  </div>
</template>

<script>
/* status 0 : normal status 1 : prepare refresh 2 : isRefreshing */
export default {
  name: 'refreshHeader',
  props: {
    tipText: String,
    status: Number
  },
  computed: {
    _tipText () {
      if (this.status === 0) {
        return '下拉刷新'
      } else if (this.status === 1) {
        return '释放更新'
      } else if (this.status === 2) {
        return '加载中'
      }
      return ''
    },
    _tipImgSrc () {
      if (this.status === 2) {
        return require('../../assets/loading.svg')
      }
      return require('../../assets/refresh-arrow.svg')
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.refresh-header
  background-color #ffffff00
  display flex
  flex-direction row
  justify-content center
  align-items center
  position absolute
  left 0
  right 0
  height 2rem
  top -2rem
  i
    font-size 0
    padding-right 10px
    .img-arrow-down
      width 100%
      transform rotate(180deg)
      transition transform .25s linear
      -webkit-transition transform .25s linear
      -moz-transition transform .25s linear
      -o-transition transform .25s linear
    .img-arrow-up
      width 100%
      transform rotate(0deg)
      transition transform .25s linear
      -webkit-transition transform .25s linear
      -moz-transition transform .25s linear
      -o-transition transform .25s linear
    .img-roating
      @keyframes rotating {
        from {
          transform: rotate(0)
        }
        to {
          transform: rotate(360deg)
        }
      }
      animation rotating 1.2s linear infinite
  span
    font-size 0.75rem
    color #bfbfbf
</style>
