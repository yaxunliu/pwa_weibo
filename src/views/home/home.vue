<template>
  <div class="hot" ref="scroll">
    <div v-show="cards.length > 0" class="scroll-content">
      <refresh-header :status=status></refresh-header>
      <weibo-card v-for="item in cards" :key="item.itemid" :json="item"></weibo-card>
      <refresh-footer :status="loadStatus"></refresh-footer>
    </div>
  </div>
</template>
<script>
import WeiboCard from '../../components/weiboCardCell/weiboCardCell'
import RefreshHeader from '../../components/refreshHeader/refreshHeader'
import RefreshFooter from '../../components/refreshFooter/refreshFooter'
import BScroll from 'better-scroll'
const { loadContainerIndex } = require('../../utils/fechData')

export default {
  name: 'home',
  data () {
    return {
      cards: [],
      refreshTip: '下拉刷新',
      status: 0,
      loadStatus: 1
    }
  },
  methods: {
    _loadData: async function () {
      try {
        let result = await loadContainerIndex()
        this.cards = result.data.cards
        this._initinalScroll()
      } catch (err) {
        console.log(err)
        return 11
      }
    },
    _initinalScroll: async function () {
      if (this.scroll) {
        this.scroll.refresh()
      } else {
        await this.$nextTick()
        this.scroll = new BScroll('.hot', {
          click: true,
          scrollY: true,
          scrollX: false,
          pullDownRefresh: { threshold: 50, stop: 30 },
          probeType: 2,
          pullUpLoad: { threshold: 50 }
        })
        this._listenRefresh()
      }
    },
    _listenRefresh: function () {
      this.scroll.on('pullingDown', () => {
        this.status = 2
        setTimeout(() => {
          this.scroll.finishPullDown()
          this.status = 0
        }, 2000)
      })
      this.scroll.on('scroll', (pos) => {
        if (pos.y > 50 && this.status === 0) {
          this.status = 1
        }
      })
      this.scroll.on('pullingUp', () => {
        console.log('pull up load')
        this.loadStatus = 1
        setTimeout(() => {
          this.scroll.finishPullUp()
          this.loadStatus = 0
        }, 2000)
      })
    }
  },
  mounted () {
    this._loadData()
  },
  components: {
    WeiboCard,
    RefreshHeader,
    RefreshFooter
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.hot
  max-width 960px
  min-width 320px
  margin 0 auto
  height 100%
  .scroll-content
    position relative
.hot::-webkit-scrollbar
  display none
</style>
