<template>
  <div class="shop__item">
    <img class="shop__img" :src="item.imgUrl" alt="">
    <div class="shop__content" :class="{'hide-border': hideBorder ? false : true}">
      <div class="shop__content__title">{{item.name}}</div>
      <div class="shop__content__tags" >
        <span class="shop__content__tag">月售: {{item.sales}}</span>
        <span class="shop__content__tag">起送: {{item.expressLimit}}</span>
        <span class="shop__content__tag">基础运费: {{item.expressPrice}}</span>
      </div>
      <div class="shop__content__highlight">{{item.slogan}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'hideBorder']
}
</script>

<style lang="scss" scoped>
  .shop__item{
    display: flex;
    padding-top: .14rem;
    .shop__img {
      width: .56rem;
      height: .56rem;
      margin-right: .16rem;
    }
    .shop__content{
      flex: 1;
      &.hide-border {
        border-bottom: 1px solid #F1F1F1;
      }
      .shop__title {
        font-size: .16rem;
        line-height: .22rem;
        color: #333333;
      }
      .shop__content__tags {
        line-height: .18rem;
        font-size: .13rem;
        color: #333333;
        margin: .08rem 0;
        .shop__content__tag {
          margin-right: .16rem;
        }
      }
      .shop__content__highlight {
        line-height: .18rem;
        font-size: .13rem;
        color: #E93B3B;
        padding-bottom: .12rem;
      }
    }
  }
</style>
