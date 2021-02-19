<template>
  <div>
    <div class="title">我的订单</div>
    <div class="order__wrapper">
      <div class="orders">
        <div class="order" v-for="(item, index) of list" :key="index">
          <div class="order__title">
            {{item.shopName}}
            <span class="order__status">
              {{item.isCanceled ? '已支付' : '已取消'}}
            </span>
          </div>
          <div class="order__content">
            <div class="order__content__imgs">
              <template v-for="(innerItem, innerIndex) of item.products" :key="innerIndex">
                <img
                  class="order__content__img"
                  v-if="innerIndex <= 3"
                  :src="innerItem.product.img" :alt="innerItem.product.name">
              </template>
            </div>
            <div class="order__content__info">
              <div class="order__content__total">¥{{item.totalPrice}}</div>
              <div class="order__content__count">共{{item.totalNumber}}件</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <docker></docker>
  </div>
</template>

<script>
import Docker from '../../Docker'
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'

const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getNearbyList = async () => {
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data
      orderList.forEach((order) => {
        const products = order.products || []
        let totalPrice = 0
        let totalNumber = 0
        products.forEach((productItem) => {
          totalNumber += (productItem?.orderSales || 0)
          totalPrice += ((productItem?.product?.price * productItem?.orderSales) || 0)
        })
        order.totalPrice = totalPrice
        order.totalNumber = totalNumber
      })
      data.list = result.data
    }
  }
  getNearbyList()
  const { list } = toRefs(data)
  console.log(list)
  return { list }
}
export default {
  name: 'OrderList',
  components: { Docker },
  setup () {
    const { list } = useOrderListEffect()
    return { list }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    line-height: .44rem;
    font-size: .16rem;
    color: #333333;
    text-align: center;
    background-color: white;
  }
  .order__wrapper {
    position: absolute;
    overflow-y: auto;
    top: .45rem;
    left: 0;
    right: 0;
    bottom: .5rem;
    background-color: #eeeeee;
    .orders {
      .order {
        margin: .16rem .18rem;
        padding: .16rem;
        background-color: white;
        .order__title {
          line-height: .22rem;
          font-size: .16rem;
          color: #333333;
          .order__status{
            font-size: .14rem;
            color: #999999;
            float: right;
          }
        }
        .order__content {
          display: flex;
          align-items: center;
          .order__content__imgs{
            flex: 1;
            .order__content__img {
              width: .4rem;
              height: .4rem;
              margin-right: .12rem;
            }
          }
          .order__content__info{
            width: .7rem;
            .order__content__total{
              margin-bottom: .04rem;
              line-height: .2rem;
              font-size: .14rem;
              color: red;
              text-align: right;
            }
            .order__content__count{
              line-height: .14rem;
              font-size: .12rem;
              color: #333333;
              text-align: right;
            }
          }
        }
      }
    }
  }
</style>
