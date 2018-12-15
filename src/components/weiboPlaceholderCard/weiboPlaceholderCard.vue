<template>
  <div class="wrapper">
      <div class="header-wrapper">
        <div class="avator"></div>
        <div class="description"></div>
      </div>
      <div class="text-wrapper">
          <div class="text"></div>
          <div class="text"></div>
          <div class="text"></div>
          <div class="text"></div>
      </div>
      <weiboFooter class="footer" forward="转发" nice="点赞" commen="评论"></weiboFooter>
  </div>
</template>

<script>
import WeiboFooter from '../weiboFooter/weiboFooter'

export default {
  name: 'weiboPlaceholderCard',
  components: {
    WeiboFooter
  },
  methods: {
    _transformCount (count) {
      if (count > 10000) {
        let num = parseFloat(count / 10000)
        return Math.round(num * 10) / 10 + '万'
      }
      return count + ' '
    }
  },
  props: {
    json: {
      type: Object,
      value: {}
    }
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
.wrapper
  background-color white
  padding 1rem 0.75rem 0 0.75rem
  margin-bottom 10px
  .header-wrapper
    width 100%
    display flex
    flex-direction row
    height 2rem
    .avator
      height 100%
      width 2rem
      background-color #bfbfbf7f
      border-radius 1rem
    .description
      margin-top 0.4rem
      margin-left .8rem
      height .75rem
      width 5rem
      background-color #bfbfbf7f
  .text-wrapper
    display flex
    flex-direction column
    .text
      height 1rem
      background-color #BFBFBF7f
      margin-top 1rem
</style>
