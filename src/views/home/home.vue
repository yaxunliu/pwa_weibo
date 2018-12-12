<template>
  <div class="hot">
    <div class="scroll-wrapper">
      <div class="scroll-content">
        <ul v-show="cards.length > 0">
          <weibo-card v-for="item in cards" :key="item.itemid" :json="item"></weibo-card>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
import WeiboCard from '../../components/weiboCardCell/weiboCardCell'

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
.hot::-webkit-scrollbar
  display none
</style>
