<template>
  <div class="nav-wrapper">
    <div class="top">
      <h1 class="nav-icon">
        <img src='./imgs/logo.png'/>
      </h1>
      <div class="search">
        <a class="search-button">
          <img src='./imgs/search.svg' />
          <span>大家都在搜: {{hot}}</span>
        </a>
      </div>
      <a class="nav-icon">
        <img src='./imgs/edit.svg'/>
      </a>
    </div>
    <div class="bottom">
      <div class="navlist-wrapper">
          <ul v-show="configList.length > 0" class="navlist-content" ref='navscroll'>
            <li v-for='(item, index) in configList' :key='index' :class='{"navlist-item": true, "navlist-item-select": index === selectIndex}'
            @click="_changeSelect(index)">
              <a class="item-button">{{item.name}}</a>
            </li>
          </ul>
      </div>
      <a class="navlist-indicator-button" @click="_sepreadClick">
        <img :class='{"img-normal": !isSpread, "img-spread": isSpread }' src='./imgs/arrow-down.svg' />
      </a>
    </div>
    <div v-show="isSpread" class="spread-area-wrapper">
        <ul class="spread-area-content">
          <li @click="_selectSpread(index)" :class="{'spread-item': true, 'spread-item-select': selectIndex === index }" v-for="(item, index) in configList" :key="index">
            <span>
              {{item.name}}
            </span>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navtop',
  data () {
    return {
      selectIndex: 0,
      isSpread: false
    }
  },
  props: {
    configList: Array,
    hot: String
  },
  methods: {
    _changeSelect: function (index) {
      this.selectIndex = index
      let element = Array.from(this.$refs.navscroll.children)[index]
      this.$refs.navscroll.scrollTo(element.offsetLeft + element.offsetWidth * 0.5 - document.documentElement.clientWidth * 0.5, 0)
      this.$emit('changeSelect', index)
    },
    _selectSpread: function (index) {
      this._changeSelect(index)
      this._sepreadClick()
    },
    _sepreadClick: function () {
      this.isSpread = !this.isSpread
    }
  },
  mounted () {
    var that = this
    window.addEventListener('resize', () => {
      let fontSize = document.documentElement.style.fontSize
      if (that.lastFontSize === fontSize) { return }
      that.lastFontSize = fontSize
    })
  }
}
</script>

<style lang="stylus" scope>
.nav-wrapper
  position fixed
  top 0
  left 0
  right 0
  width 100%
  max-width 960px
  min-width 320px
  margin 0 auto
  background-color white
  height 5.7rem
  z-index 1000
  .top
    display flex
    flex-direction row
    height 2.9rem
    justify-content space-between
    align-items center
    .nav-icon
      height 100%
      width 1.6rem
      min-width 24px
      display flex
      align-items center
      padding-left 0.75rem
      padding-right 0.75rem
      img
        width 100%
    .search
      width 100%
      height 100%
      box-sizing border-box
      display flex
      align-items center
      padding-left 0.625rem
      padding-right 0.625rem
      .search-button
        background-color #ebebec
        width 100%
        height 1.75rem
        display flex
        flex-direction space-between
        justify-content flex-start
        align-items center
        img
          height 60%
          padding 0 0.5rem
        span
          color #bdbdbd
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
          width 100%
          font-size 0.7rem
  .bottom
    position relative
    height 2.8rem
    .navlist-wrapper
      height 100%
      width 100%
      padding-right 2.2rem
      box-sizing border-box
      .navlist-content
        height 100%
        display -webkit-box
        padding-right 2.2rem
        overflow-x scroll
        -webkit-overflow-scrolling touch
        .navlist-item
          list-style none
          height 100%
          padding 0 0.75rem
          color #a5adb5
          font-size 1rem
          line-height 2.8rem
          cursor pointer
        .navlist-item:last-child
          margin-right 2.2rem
        .navlist-item:active
          .item-button
            background-color #bdbdbd
        .navlist-item-select
          color #262626
          position relative
        .navlist-item-select:after
          content ''
          float left
          bottom 0
          height 2px
          left 50%
          margin-left -0.5rem
          width 1rem
          position absolute
          background-color #262626
      .navlist-content::-webkit-scrollbar
        display none
    .navlist-indicator-button
      position absolute
      right 0
      top 0
      bottom 0
      background-color white
      width 0.8rem
      padding 0 0.7rem
      display flex
      .img-normal
        width 100%
        transform rotate(0deg)
        transition transform .25s linear
        -webkit-transition transform .25s linear
        -moz-transition transform .25s linear
        -o-transition transform .25s linear
      .img-spread
        width 100%
        transform rotate(180deg)
        transition transform .25s linear
        -webkit-transition transform .25s linear
        -moz-transition transform .25s linear
        -o-transition transform .25s linear

  .spread-area-wrapper
    padding-bottom 1rem
    background-color #fff
    padding-left 0.7rem
    padding-right 0.7rem
    .spread-area-content
      display flex
      flex-direction row
      flex-wrap wrap
      justify-content flex-start
      .spread-item
        list-style none
        width 22%
        height 2.3rem
        line-height 2.3rem
        text-align center
        box-sizing border-box
        margin-top 0.5rem
        margin-bottom 0.5rem
        background-color #eeeeee
        border-radius 4px
        margin-right 4%
        span
          width 100%
          height 100%
          font-size: 0.8rem
          display inline-block
      .spread-item-select
        color #fd9133
      .spread-item:nth-child(4n)
        margin-right 0

</style>
