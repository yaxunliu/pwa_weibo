<template>
  <div class="footer-wrapper">
    <div class="footer-content">
      <a class="bar-button">
        <img src="../../assets/forward.svg"/>
        <span>{{forward}}</span>
      </a>
      <a class="bar-button">
        <img src="../../assets/comment.svg"/>
        <span>{{nice}}</span>
      </a>
      <a class="bar-button">
        <img src="../../assets/nice.svg"/>
        <span>{{commen}}</span>
      </a>
    </div>
    <a class="more-button">
      <img src="../../assets/more.svg"/>
    </a>
  </div>
</template>

<script>
export default {
  name: 'weiboFooter',
  props: {
    forward: String,
    nice: String,
    commen: String
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.footer-wrapper
  list-style none
  padding 0 0.75rem
  position relative
  .footer-content
    hieght 1rem
    padding 1rem 0
    display flex
    flex-direction row
    .bar-button
      display flex
      flex-direction row
      align-items center
      justify-content flex-start
      height 1rem
      margin-left 1.68rem
      span
        line-height 1rem
        margin-left 4px
        font-size 0.81rem
        color rgba(40,47,60,0.8)
      img
        height 1rem
    .bar-button:nth-child(1)
      margin-left 0
  .more-button
    position absolute
    padding 0 0.75rem
    top 0
    right 0
    bottom 0
    display flex
    justify-content center
    align-items center
</style>
