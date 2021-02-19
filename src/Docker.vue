<template>
  <div class="docker">
    <div class="docker__item " :class="{'docker__item--active': index === 0}" v-for="(item, index) of dockerList" :key="index">
      <router-link :to="item.to">
        <span class="iconfont" v-html="item.icon"/>
        <div class="docker__title">{{item.text}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  setup () {
    const dockerList = [
      { icon: '&#xe869;', text: '首页', to: { name: 'home' } },
      { icon: '&#xe603;', text: '购物车', to: { name: 'home' } },
      { icon: '&#xe713;', text: '订单', to: { name: 'OrderList' } },
      { icon: '&#xe7ae;', text: '我的', to: { name: 'home' } }
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
      a {
        color: #333333;
        text-decoration: none;
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
