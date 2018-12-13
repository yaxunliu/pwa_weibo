<template>
  <div class="refresh-footer">
    <i v-if="status !== 0" class="loading-icon" ><img src="../../assets/loading.svg" class="img-roating"></i>
    <span v-else>no more data</span>
  </div>
</template>

<script>
/* status: 0: no more data 1: loading 2:  */
export default {
  name: 'refreshFooter',
  props: {
    beginLoading: String,
    tipText: String,
    status: Number
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.refresh-footer
  display flex
  flex-direction row
  justify-content center
  align-items center
  background-color #ffffff00
  height 30px
  i
    display inline-block
    height 60%
    img
      height 100%
    .img-roating
      @keyframes rotating {
        from {
          transform: rotate(0)
        }
        to {
          transform: rotate(360deg)
        }
      }
      animation rotating 1.2s linear infinite
  span
    padding-left 10px
</style>
