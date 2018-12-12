<template>
  <div class="hot">
      <div class="scroll-wrapper">
        <ul v-show="cards.length > 0" class="scroll-content">
          <div class="refresh-header" style="">refresh header</div>
          <weibo-card v-for="item in cards" :key="item.itemid" :json="item"></weibo-card>
          <div class="refresh-footer" style="background-color: red;">refresh footer</div>
        </ul>
      </div>
  </div>
</template>
<script>
import WeiboCard from '../../components/weiboCardCell/weiboCardCell'
import BScroll from 'better-scroll'

export default {
  name: 'home',
  data () {
    return {
      cards: []
    }
  },
  mounted () {
    var that = this
    this.$store.dispatch('loadContainerIndex', function (json) {
      that.cards = json.data.cards
      console.log(json)
    })
    this._initinalScroll()
  },
  methods: {
    _initinalScroll () {
      this.scroll = new BScroll('.scroll-wrapper', { click: true, scrollY: true })
    }
  },
  components: {
    WeiboCard
  }
}

</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.hot
  max-width 960px
  min-width 320px
  margin 0 auto
  height 100%
  .scroll-wrapper
    height 100%
    .scroll-content
      position relative
      .refresh-header
        position absolute
        top -20px
.hot::-webkit-scrollbar
  display none
</style>
