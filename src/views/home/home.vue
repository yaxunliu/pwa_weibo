<template>
  <div class="hot" ref="scroll">
    <div class="scroll-content">
      <div v-if="cards.length > 0">
        <refresh-header :status=status></refresh-header>
        <weibo-card v-for="item in cards" :key="item.itemid" :json="item"></weibo-card>
        <refresh-footer :status="loadStatus"></refresh-footer>
      </div>
      <weibo-placeholder-card v-else v-for="item in [1, 2, 3, 4, 5]" :key="item"></weibo-placeholder-card>
    </div>
  </div>
</template>
<script>
import WeiboCard from '../../components/weiboCardCell/weiboCardCell'
import WeiboPlaceholderCard from '../../components/weiboPlaceholderCard/weiboPlaceholderCard'
import RefreshHeader from '../../components/refreshHeader/refreshHeader'
import RefreshFooter from '../../components/refreshFooter/refreshFooter'
import BScroll from 'better-scroll'
const { loadContainerIndex } = require('../../utils/fechData')

export default {
  name: 'home',
  data () {
    return {
      cards: [],
      page: 1,
      status: 0,
      loadStatus: 1,
      gid: null
    }
  },
  watch: {
    '$route' (to, from) {
      console.log('to', to, 'from', from)
      this._resetData()
      this._redirectRefresh()
    }
  },
  methods: {
    _reloadData: async function (callback) {
      try {
        if (this.gid) {
          let result = await loadContainerIndex(this.gid, 1)
          this.cards = result.data.cards
          this._initinalScroll()
          callback && callback(true)
        }
      } catch (err) {
          callback && callback(false)
      }
    },
    _initinalScroll: async function () {
      if (this.scroll) {
        this.scroll.refresh()
      } else {
        await this.$nextTick()
        let rem = document.documentElement.style.fontSize.replace('px', '')
        this.scroll = new BScroll('.hot', {
          click: true,
          scrollY: true,
          scrollX: false,
          pullDownRefresh: { threshold: 50, stop: 2 * rem },
          probeType: 2,
          pullUpLoad: { threshold: 50 }
        })
        this._listenRefresh()
      }
    },
    _listenRefresh: function () {
      this.scroll.on('pullingDown', () => {
        this.status = 2
        let that = this
        this._reloadData(function (ok) {
          that.scroll.finishPullDown()
          that.status = 0
        })
      })
      this.scroll.on('scroll', (pos) => {
        if (pos.y > 50 && this.status === 0) {
          this.status = 1
        }
      })
      this.scroll.on('pullingUp', async () => {
        this.loadStatus = 1
        this.page += 1
        let result = await loadContainerIndex(this.gid, this.page)
        this.cards = this.cards.concat(result.data.cards)
        this.scroll.finishPullUp()
        this.loadStatus = 0
        this.$nextTick(() => {
          this._initinalScroll()
        })
      })
    },
    _resetData: function () {
      this.page = 1
      this.cards = []
      this.loadStatus = 1
      this.status = 0
      this.gid = null
      this.scroll && this.scroll.scrollTo(0, 0)
    },
    _redirectRefresh: function () {
      this.gid = this.$route.query.id
      this._reloadData()
    }
  },
  mounted () {
    this._redirectRefresh()
  },
  components: {
    WeiboCard,
    RefreshHeader,
    RefreshFooter,
    WeiboPlaceholderCard
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
