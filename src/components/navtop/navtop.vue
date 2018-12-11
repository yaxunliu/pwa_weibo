<template>
  <div class="nav-wrapper">
    <div class="top">
      <h1 class="nav-icon">
        <img src='./imgs/logo.png'/>
      </h1>
      <div class="search">
        <a class="search-button">
          <img src='./imgs/search.svg' />
          <span>大家都在搜: 吴磊 我站在这里好吗</span>
        </a>
      </div>
      <a class="nav-icon">
        <img src='./imgs/edit.svg'/>
      </a>
    </div>

    <div class="bottom">
      <div class="navlist-wrapper">
          <ul class="navlist-content" ref='scroll' :style='{width: contentWidth}'>
            <li v-for='(item, index) in list' :key='index' :class='{"navlist-item": true, "navlist-item-select": index === selectIndex}'
            @click="_changeSelect(index)">
              <a class="item-button">{{item}}</a>
            </li>
          </ul>
      </div>
      <a class="navlist-indicator-button">
        <img src='./imgs/arrow-down.svg' />
      </a>
    </div>
  </div>
</template>

<script>

import BScroll from 'better-scroll'

export default {
  name: 'navtop',
  data () {
    return {
      list: ['热门', '新鲜事', '搞笑', '情感', '明星', '社会', '数码', '体育', '汽车', '电影', '游戏'],
      contentWidth: '100px',
      selectIndex: 0,
      screenWidth: document.body.clientWidth
    }
  },
  methods: {
    _changeSelect: function (index) {
      this.selectIndex = index
      let elment = Array.from(this.$refs.scroll.children)[index]
      // 判断是否需要滚到中间去
      this.scroll.scrollToElement(elment, 1000, true)
    },
    _recaculateContentWidth: function () {
      let width = 0
      Array.from(this.$refs.scroll.children).forEach((element) => {
        width += (element.clientWidth)
      })

      this.contentWidth = (width + 1) + 'px'
      console.log(this.contentWidth)
    }
  },
  mounted () {
    this._recaculateContentWidth()
    this.$nextTick(() => {
      this.scroll = new BScroll('.navlist-wrapper', { click: true, scrollX: true })
    })
    var that = this
    window.addEventListener('resize', () => {
      let fontSize = document.documentElement.style.fontSize
      if (that.lastFontSize === fontSize) { return }
      that.lastFontSize = fontSize
      that._recaculateContentWidth()
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
  .top
    display flex
    flex-direction row
    height 2.9rem
    justify-content space-between
    align-items center
    .nav-icon
      height 100%
      width 1.6rem
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
          font-size 0.8rem
  .bottom
    position relative
    height 2.8rem
    .navlist-wrapper
      height 100%
      width 100%
      display inline-block
      padding-right 2.2rem
      box-sizing border-box
      .navlist-content
        height 100%
        overflow hidden
        padding-right 2.2rem
        .navlist-item
          list-style none
          height 100%
          float left
          display block
          padding 0 0.75rem
          color #a5adb5
          font-size 1rem
          line-height 44px
          cursor pointer
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

    .navlist-indicator-button
      position absolute
      right 0
      top 0
      bottom 0
      background-color white
      width 0.8rem
      padding 0 0.7rem
      display flex
      img
        width 100%

</style>
