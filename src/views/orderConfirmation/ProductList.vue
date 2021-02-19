<template>
    <div class="products">
      <div class="products__title">{{shopName}}</div>
      <div class="products__wrapper">
        <div class="products__list">
          <div class="products__item" v-for="item in productList" :key="item._id">
            <img class="products__item__img" :src="item.imgUrl" alt="">
            <div class="products__item__detail">
              <div class="products__item__title">{{item.name}}</div>
              <div class="products__item__price">
                <span>&yen;{{item.price}} x {{item.count}}</span>
                <span class="products__item__total">&yen;{{item.price * item.count}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { useCommonCartEffect } from '../../effect/commonCartEffect'
import { useRoute } from 'vue-router'
export default {
  name: 'ProductList',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { shopName, productList } = useCommonCartEffect(shopId)
    console.log(productList)
    return { shopName, productList }
  }
}
</script>

<style lang="scss" scoped>
  .products {
    background: white;
    margin: .16rem .16rem .1rem .16rem;
    .products__title {
      padding: .16rem;
      line-height: .22rem;
      font-size: .16rem;
      font-weight: bold;
      color: #333333;
    }
    .products__wrapper {
      position: absolute;
      top: 2.6rem;
      left: 0;
      right: 0;
      bottom: .6rem;
      margin: 0 .16rem;
      overflow-y: scroll;
      .products__list {
        background-color: white;
        .products__item {
          position: relative;
          display: flex;
          padding: 0 .16rem .16rem .16rem;
          .products__item__img{
            width: .46rem;
            height: .46rem;
            margin-right: .16rem;
          }
          .products__item__detail{
            flex: 1;
            .products__item__title {
              line-height: .22rem;
              font-size: .14rem;
              color: #333333;
            }
            .products__item__price {
              display: flex;
              margin-top: .06rem;
              color: red;
              font-size: .14rem;
              .products__item__total {
                flex: 1;
                color: #000;
                text-align: right;
              }
            }
          }
        }
      }
    }
  }
</style>
