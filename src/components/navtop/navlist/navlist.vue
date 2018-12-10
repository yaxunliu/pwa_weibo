<template>
  <div class="wrapper">
      <ul class="content">
        <li v-for='item, index in list' :key='index' class="item">
          <a class="item-button">
            {{item}}
          </a>
        </li>
      </ul>
      <a class="indicator-button">
        hello world
      </a>
  </div>
</template>

<script>
export default {
  name: 'navlist',
  data() {
    return {
      list: ['热门', '新鲜事', '搞笑', '情感', '明星', '社会', '数码', '体育', '汽车', '电影', '游戏']
    }
  }
}
</script>


<style scope lang='stylus'>



</style>
