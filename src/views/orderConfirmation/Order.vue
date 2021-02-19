<template>
    <div class="order">
      <div class="order__price">实付金额 <b>¥{{results.price}}</b></div>
      <div class="order__btn" @click="handleShowMaskClick(true)">提交订单</div>
    </div>
    <div class="mask" v-show="showMask" @click="handleShowMaskClick(false)">
      <div class="mask__content" @click.stop>
        <div class="mask__content__title">确认要离开收银台？</div>
        <div class="mask__content__desc">请尽快完成支付，否则将被取消</div>
        <div class="mask__content__btns">
          <div class="mask__content__btn mask__content__btn-cancel" @click="handleConfirmOrder(false)">取消订单</div>
          <div class="mask__content__btn mask__content__btn-confirm" @click="handleConfirmOrder(true)">确认支付</div>
        </div>
      </div>
    </div>
</template>

<script>
import { useCommonCartEffect } from '../../effect/commonCartEffect'
import { useRoute, useRouter } from 'vue-router'
import { post } from '../../utils/request'
import { ref } from 'vue'
import { useStore } from 'vuex'
const useMakeOrderEffect = (shopId, shopName, productList) => {
  const router = useRouter()
  const store = useStore()
  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    for (const i in productList.value) {
      const product = productList.value[i]
      products.push({ id: parseInt(product._id, 10), num: product.count })
    }
    const result = await post('/api/order', {
      addressId: 1,
      shopId,
      shopName: shopName.value,
      isCanceled,
      products
    })
    if (result?.errno === 0) {
      store.commit('changeCleanCartList', { shopId })
      router.push({ name: 'OrderList' })
    } else {
      console.log('maskOrder error')
    }
  }
  return { handleConfirmOrder }
}
const useShowMaskEffect = () => {
  const showMask = ref(false)
  const handleShowMaskClick = (status) => {
    showMask.value = status
  }
  return { showMask, handleShowMaskClick }
}
export default {
  name: 'Order',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { results, shopName, productList } = useCommonCartEffect(shopId)
    const { handleConfirmOrder } = useMakeOrderEffect(shopId, shopName, productList)
    const { showMask, handleShowMaskClick } = useShowMaskEffect()
    return {
      results,
      showMask,
      handleShowMaskClick,
      handleConfirmOrder
    }
  }
}
</script>

<style lang="scss" scoped>
  .order {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: .49rem;
    line-height: .49rem;
    background-color: white;
    display: flex;
    font-size: .14rem;
    .order__price {
      flex: 1;
      color: #333333;
      text-indent: .24rem;
    }
    .order__btn {
      width: .98rem;
      background-color: #1FA4FC;
      color: white;
      text-align: center;
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    .mask__content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 3rem;
      height: 1.57rem;
      background-color: white;
      border-radius: .04rem;
      text-align: center;
      .mask__content__title {
        margin: .24rem 0 .08rem 0;
        line-height: .26rem;
        font-size: .18rem;
        color: #333333;
      }
      .mask__content__desc {
        line-height: .2rem;
        font-size: .14rem;
        color: #666666;
      }
      .mask__content__btns {
        display: flex;
        margin: .24rem .59rem .24rem .59rem;
        font-size: .14rem;
        .mask__content__btn {
          width: .8rem;
          line-height: .32rem;
          border-radius: .16rem;
        }
        .mask__content__btn-cancel {
          border: .01rem solid #1FA4FC;
          color: #1FA4FC;
          margin-right: .24rem;
        }
        .mask__content__btn-confirm {
          background-color: #1FA4FC;
          color: white;
        }
      }
    }
  }
</style>
