<template>
    <div class="header-wraper">
      <div class="header-pannel">
        <div class="header-avator">
          <img :src="avator" alt="">
          <span class="v-tag">
            <img src="../../assets/v.svg"/>
          </span>
        </div>
        <div class="header-detail">
          <div class="nick"> {{ nick }} </div>
          <div class="time"> {{ subDesc }} </div>
        </div>
        <div class="header-focus">
          <a> + 关注 </a>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'weiboHeader',
  props: {
    avator: String,
    nick: String,
    subDesc: String
  }

}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.header-wraper
  padding 0 0.75rem
  padding-top 0.9rem
  background-color white
  .header-pannel
    display flex
    flex-direction row
    justify-content space-between
    align-items flex-start
    .header-avator
      position relative
      img
        border-radius 1rem
        width 2rem
        height 2rem
      .v-tag
        width 0.8rem
        height 0.8rem
        background-color #2fb0f7
        position absolute
        right 0
        top 1.2rem
        border-radius 0.4rem
        display flex
        justify-content center
        align-items center
        img
          height 50%
          width 50%
    .header-detail
      width 100%
      margin 0.15rem 0 0.15rem 0.5rem
      .nick
        font-size 0.875rem
        color #333
        line-height 1.4
      .time
        font-size 0.68rem
        color #939393
        line-height 1.4
    .header-focus
      background-color white
      a
        width 4.56rem
        display inline-block
        height 1.5rem
        font-size 0.75rem
        color #87909a
        border 1px solid #87909a7f
        text-align center
        line-height 1.625rem
        cursor: pointer
</style>
