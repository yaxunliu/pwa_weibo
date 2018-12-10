<template>
  <div class="nav-wrapper">
    <div class="top">
      <h1 class="logo">
        <img class='logo-icon' src='./imgs/logo.png'/>
      </h1>
      <div class="search">
        <a class="search-button">
          <img src='./imgs/search.svg' />
          <span>大家都在搜: 吴磊 我站在这里好吗</span>
        </a>
      </div>
      <a class="edit-weibo">
        <img src='./imgs/edit.svg'/>
      </a>
    </div>

    <div class="bottom">
      <div class="navlist-wrapper">
          <ul class="navlist-content">
            <li v-for='item, index in list' :key='index' class="navlist-item">
              <a class="item-button">
                {{item}}
              </a>
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

import BScroll from 'better-scroll';

export default {
  name: 'navtop',
  data() {
    return {
      list: ['热门', '新鲜事', '搞笑', '情感', '明星', '社会', '数码', '体育', '汽车', '电影', '游戏','热门', '新鲜事', '搞笑', '情感', '明星', '社会', '数码', '体育', '汽车', '电影', '游']
    }
  },
  mounted: () => {

    // this.$nextTick(() => {
      new BScroll('.navlist-wrapper', {
          click: true,
          scrollX: true
        });
      // })

  }

}
</script>

<style scope lang="stylus">
.nav-wrapper
  position fixed
  top 0
  left 0
  width 100%
  .top
    display flex
    flex-direction row
    height 2.3rem
    justify-content space-between
    align-items center
    .logo
      height 100%
      width 1.3rem
      display flex
      align-items center
      padding-left 0.6rem
      padding-right 0.6rem
      .logo-icon
        width 100%
    .search
      width 100%
      height 100%
      box-sizing border-box
      display flex
      align-items center
      padding-left 0.5rem
      padding-right 0.5rem
      .search-button
        display inline-block
        background-color #ebebec
        width 100%
        height 1.4rem
        display flex
        flex-direction space-between
        justify-content flex-start
        align-items center
        img
          height 60%
          padding 0 0.5rem
        span
          font-size 0.8rem
          color #bdbdbd
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
          width 100%
          font-size 0.6rem
          line-height 100%
    .edit-weibo
      height 100%
      width 1.3rem
      padding-left 0.6rem
      padding-right 0.6rem
      display flex
      align-items center
      img
        width 100%
  .bottom
    position relative
    height 2.2rem
    .navlist-wrapper
      height 100%
      width 100%
      display inline-block
      padding-right 2.2rem
      box-sizing border-box
      .navlist-content
        height 100%
        display inline
        white-space nowrap
        overflow scroll
        background-color blue
        .navlist-item
          list-style none
          height 100%
          float left
          display block
          color #a5adb5
          font-size 0.8rem
        .navlist-item:active
          color #262626
    .navlist-indicator-button
      position absolute
      right 0
      top 0
      bottom 0
      background-color red
      width 0.8rem
      padding 0 0.7rem
      display flex
      img
        width 100%

</style>
