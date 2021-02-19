<template>
  <div class="mask" v-show=" showCart && results.total > 0"></div>
  <div class="cart">
    <div class="products" v-show="showCart && results.total > 0">
      <div class="product__header">
        <div class="product__header__all" @click="setCartItemsSelected(shopId)">
          <span class="product__header__icon iconfont" v-html="results.allChecked ? '&#xe624;' : '&#xe6f7;'"></span>
          全选
        </div>
        <div class="product__header__clean">
          <span class="product__header__clean__btn" @click="handleCleanCartList(shopId)">清空购物车</span>
        </div>
      </div>
      <template v-for="item of productList" :key="item._id">
        <div class="product__item" v-if="item.count > 0">
          <div class="product__item__check">
            <span class="iconfont" @click="changeCartItemSelected(shopId, item._id)" v-html="item.selected ? '&#xe624;' : '&#xe6f7;'"></span>
          </div>
          <img class="product__item__img" :src="item.imgUrl" alt="">
          <div class="product__item__detail">
            <div class="product__item__title">{{item.name}}</div>
            <div class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{item.price}}
              <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
            </div>
            <div class="product__number">
              <span class="product__number__minus" @click="changeCartItemInfo(shopId, item._id, item, -1)">-</span>
              {{item.count}}
              <span class="product__number__plus" @click="changeCartItemInfo(shopId, item._id, item, 1)">+</span>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          class="check__icon__img"
          @click="handleShowCart"
          src="http://www.dell-lee.com/imgs/vue3/basket.png" alt="">
        <div class="check__icon__tag" v-show="results.total">{{results.total}}</div>
      </div>
      <div class="check__info">
        <span v-if="results.total">总计: <span class="check__info__price">&yen;{{results.price}}</span></span>
        <span v-else>购物车是空的</span>
      </div>
      <div class="check__btn" v-show="results.price > 0">
        <router-link :to="`/orderConfirmation/${shopId}`">
          去结算
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effect/commonCartEffect'

const useCartEffect = (shopId) => {
  const { changeCartItemInfo, results, productList } = useCommonCartEffect(shopId)
  const store = useStore()

  const changeCartItemSelected = (shopId, productId) => {
    store.commit('changeCartItemSelected', { shopId, productId })
  }

  const handleCleanCartList = (shopId) => {
    store.commit('changeCleanCartList', { shopId })
  }

  const setCartItemsSelected = (shopId) => {
    store.commit('setCartItemsSelected', { shopId })
  }

  return { results, productList, setCartItemsSelected, changeCartItemInfo, changeCartItemSelected, handleCleanCartList }
}

const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleShowCart = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleShowCart }
}
export default {
  name: 'Cart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { showCart, handleShowCart } = toggleCartEffect()
    const { results, productList, setCartItemsSelected, changeCartItemInfo, changeCartItemSelected, handleCleanCartList } = useCartEffect(shopId)
    return {
      shopId,
      showCart,
      handleShowCart,
      results,
      productList,
      changeCartItemInfo,
      changeCartItemSelected,
      handleCleanCartList,
      setCartItemsSelected
    }
  }
}
</script>

<style lang="scss" scoped>
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 1;
  }
  .cart {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background-color: white;
    .products {
      .product__header {
        display: flex;
        line-height: .52rem;
        border-bottom: .01rem solid #eeeeee;
        font-size: .14rem;
        color: #333333;
        .product__header__all{
          width: .64rem;
          margin-left: .18rem;
          .product__header__icon {
            display: inline-block;
            margin-right: .1rem;
            color: #1FA4FC;
            vertical-align: middle;
            font-size: .2rem;
          }
        }
        .product__header__clean {
          flex: 1;
          margin-right: .16rem;
          text-align: right;
          .product__header__clean__btn {
            display: inline-block;
            color: #1FA4FC;
          }
        }
      }
      .product__item {
        position: relative;
        display: flex;
        margin: 0 .18rem;
        padding-bottom: .16rem;
        &:first-child {
          padding-top: .16rem;
        }
        .product__item__check {
          .iconfont {
            line-height: .46rem;
            font-size: .2rem;
            margin-right: .18rem;
            color: #1FA4FC;
          }
        }
        .product__item__img {
          display: block;
          width: .46rem;
          height: .46rem;
          margin-right: .16rem;
        }
        .product__item__detail {
          flex: 1;
          .product__item__title{
            line-height: .2rem;
            font-size: .14rem;
            color: #333333;
          }
          .product__item__price {
            margin-top: .06rem;
            color: red;
            font-size: .14rem;
            .product__item__yen{
              font-size: .12rem;
            }
            .product__item__origin{
              font-size: .12rem;
              color: #999999;
              text-decoration: line-through;
            }
          }
          .product__number {
            position: absolute;
            right: 0;
            bottom: .16rem;
            .product__number__minus,.product__number__plus {
              display: inline-block;
              width: .2rem;
              height: .2rem;
              line-height: .2rem;
              font-size: .2rem;
              text-align: center;
              border-radius: 50%;
            }
            .product__number__minus {
              margin-right: .05rem;
              border: 1px solid #666666;
              color: #666666;
            }
            .product__number__plus {
              margin-left: .05rem;
              background-color: #1FA4FC;
            }
          }
        }
      }
    }
    .check {
      display: flex;
      height: .49rem;
      line-height: .49rem;
      box-shadow: 0, -.01rem, 01rem, 0, #F1F1F1;
      .check__icon {
        position: relative;
        width: .76rem;
        .check__icon__img{
          display: block;
          margin: .12rem auto 0;
          width: .28rem;
          height: .26rem;
        }
        .check__icon__tag{
          position: absolute;
          top: .08rem;
          left: .45rem;
          min-width: .2rem;
          height: .2rem;
          line-height: .2rem;
          font-size: .12rem;
          text-align: center;
          background-color: red;
          border-radius: .1rem;
          transform: scale(.7);
          transform-origin: left center;
        }
      }
      .check__info{
        flex: 1;
        font-size: .12rem;
        color: #333333;
        .check__info__price {
          font-size: .18rem;
          color: red;
        }
      }
      .check__btn {
        width: .98rem;
        background-color: #4FB0F9 ;
        text-align: center;
        color: white !important;
        font-size: .14rem;
        a {
          color: white;
          text-decoration: none;
        }
      }
    }
  }
</style>
