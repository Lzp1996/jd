<template>
  <div class="docker">
    <div class="docker__item " :class="{'docker__item--active': index === 0}" v-for="(item, index) of dockerList" :key="index">
      <span class="iconfont" v-html="item.icon"/>
      <div class="docker__title">{{item.text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  setup () {
    const dockerList = [
      { icon: '&#xe869;', text: '首页' },
      { icon: '&#xe603;', text: '购物车' },
      { icon: '&#xe713;', text: '订单' },
      { icon: '&#xe7ae;', text: '我的' }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
  .docker {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    text-align: center;
    width: 100%;
    height: .5rem;
    padding: 0 .18rem;
    box-sizing: border-box;
    box-shadow: 0 -1px 1px 0 #F1F1F1;
    .docker__item {
      flex: 1;
      .iconfont {
        display: inline-block;
        margin: 0.07rem 0 0.02rem 0;
        font-size: .2rem;
      }
      &--active {
        color: #1FA4FC;
      }
      .docker__title {
        font-size: .2rem;
        transform: scale(.5);
        transform-origin: center top;
      }
    }
  }
</style>
