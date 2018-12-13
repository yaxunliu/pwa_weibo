<template>
  <div class="card-wrapper" v-if="mblog">
    <article class="card-content">
      <weibo-header :avator="mblog.user.profile_image_url" :nick="mblog.user.screen_name" :sub-desc="mblog.source ? mblog.created_at + '  ' + '来自' + mblog.source : mblog.created_at"></weibo-header>
      <span class="text-content" v-html="mblog.text"></span>
    </article>
    <div class="pic-wrapper" v-if="mblog.pics && mblog.pics.length > 0">
      <a class="pic-item" v-for="pic in mblog.pics" :key="pic.pid">
        <img :src="pic.url" alt="">
      </a>
    </div>
    <weibo-footer :forward="_transformCount(mblog.reposts_count)" :nice="_transformCount(mblog.attitudes_count)" :commen="_transformCount(mblog.comments_count)"></weibo-footer>
  </div>
</template>

<script>
import WeiboHeader from '../weiboHeader/weiboHeader'
import WeiboFooter from '../weiboFooter/weiboFooter'

export default {
  name: 'weiboCardCell',
  components: {
    WeiboHeader,
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
  },
  computed: {
    mblog () {
      if (this.json.card_type === 9) {
        return this.json.mblog
      } else {
        return this.json.card_group && this.json.card_group[0].mblog
      }
    }
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
.card-wrapper
  background-color white
  .card-content
    .text-content
      padding .75rem 0.75rem 0 0.75rem
      display inline-block
      width 100%
      box-sizing border-box
      line-height 1.5
      word-wrap break-word
      a
        text-decoration none
        color #3c6e9e
  .pic-wrapper
    display flex
    flex-direction row
    padding 0 0.75rem
    flex-wrap wrap
    justify-content flex-start
    .pic-item
      width 32%
      padding-bottom 32%
      margin-top 2%
      margin-left 2%
      background-color #f2f2f2
      font-size 0
      overflow hidden
      position relative
      img
        position absolute
        width 100%
        height 100%
        object-fit cover
    .pic-item:nth-child(1)
      margin-top 0
      margin-left 0
    .pic-item:nth-child(2)
      margin-top 0
    .pic-item:nth-child(3)
      margin-top 0
    .pic-item:nth-child(3n+1)
      margin-left 0

</style>
