<template>
    <div class="content">
      <div class="category">
        <ul class="category__list">
          <li
            class="category__item"
            v-for="item in categories"
            :key="item.name"
            @click="handleTabClick(item.tab)"
            :class="{'current__item-active': currentTab === item.tab}"
          >
            {{item.name}}
          </li>
        </ul>
      </div>
      <div class="product">
        <div class="product__item" v-for="item of productList" :key="item._id">
          <img class="product__item__img" :src="item.imgUrl" alt="">
          <div class="product__item__detail">
            <h2 class="product__item__title">{{item.name}}</h2>
            <p class="product__item__sales">月售{{item.sales}}件</p>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{item.price}}
              <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
            </p>
            <div class="product__number">
              <span
                class="product__number__minus"
                @click="() => { changeCartItem(shopId, item._id, item, -1, shopName) }"
              >-</span>
              <span class="product__num">
                {{ cartList?.[shopId]?.productList?.[item._id]?.count || 0 }}
              </span>
              <span
                class="product__number__plus"
                @click="() => { changeCartItem(shopId, item._id, item, 1, shopName) }"
              >+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { reactive, toRefs, ref, watchEffect } from 'vue'
import { get } from '../../utils/request'
import { useCommonCartEffect } from '../../effect/commonCartEffect'
import { useStore } from 'vuex'
const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]

const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

const useProductListEffect = (currentTab, shopId) => {
  const data = reactive({ productList: [] })
  const getProductList = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    })
    if (result.errno === 0 && result.data.length > 0) {
      data.productList = result.data
    } else {
      console.log('productList error')
    }
  }
  watchEffect(() => {
    getProductList()
  })
  const { productList } = toRefs(data)
  return { productList }
}

const useCartEffect = () => {
  const store = useStore()
  const { cartList, changeCartItemInfo } = useCommonCartEffect()
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
  }
  // const getProductCartCount = (shopId, productId) => {
  //   console.log(shopId, productId)
  //   return cartList?.[shopId]?.productList?.[productId]?.count || 0
  // }
  const changeCartItem = (shopId, productId, productInfo, num, shopName) => {
    changeCartItemInfo(shopId, productId, productInfo, num)
    changeShopName(shopId, shopName)
  }

  return { cartList, changeCartItem }
}

export default {
  name: 'ShopContent',
  props: ['shopName'],
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { productList } = useProductListEffect(currentTab, shopId)
    const { cartList, changeCartItem } = useCartEffect()
    return {
      categories,
      currentTab,
      handleTabClick,
      productList,
      cartList,
      shopId,
      changeCartItem
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    position: absolute;
    top: 1.41rem;
    left: 0;
    right: 0;
    bottom: .5rem;
    .category{
      overflow-y: scroll;
      width: .76rem;
      background-color: #eeeeee;
      .category__list {
        margin: 0;
        padding: 0;
        .category__item {
          line-height: .4rem;
          font-size: .14rem;
          text-align: center;
          color: #333333;
          &.current__item-active {
           background-color: white;
          }
        }
      }
    }
    .product {
      overflow-y: scroll;
      flex: 1;
      .product__item {
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;
        border-bottom: .01rem solid #F1F1F1;
        .product__item__img{
          width: .68rem;
          height: .68rem;
          margin-right: .16rem;
        }
        .product__item__detail{
          flex: 1;
          .product__item__title {
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color: #333333;
          }
          .product__item__sales {
            line-height: .16rem;
            font-size: .12rem;
            color: #333333;
            margin: .06rem 0;
          }
          .product__item__price {
            line-height: .2rem;
            font-size: .14rem;
            margin: 0;
            color: red;
            .product__item__yen {
              font-size: .12rem;
            }
            .product__item__origin{
              margin-left: .06rem;
              font-size: .12rem;
              color: #999999;
              text-decoration: line-through;
            }
          }
          .product__number {
            position: absolute;
            right: 0;
            bottom: .12rem;
            .product__number__minus,.product__number__plus {
              display: inline-block;
              width: .2rem;
              height: .2rem;
              line-height: .2rem;
              text-align: center;
              font-size: .2rem;
              border-radius: 50%;
            }
            .product__num {
              display: inline-block;
              width: .2rem;
              text-align: center;
              margin: 0 .05rem 0 .05rem;
            }
            .product__number__minus {
              color: #666666;
              border: .01rem solid #666666;
            }
            .product__number__plus {
              background-color: #1FA4FC;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
</style>
