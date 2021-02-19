<template>
  <div class="top">
    <div class="top__header">
      <div class="top__header__icon iconfont" @click="handleBackClick">&#xe6db;</div>
      确认订单
    </div>
    <div class="top__receiver">
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
      <div class="top__receiver__info">
        <span class="top__receiver__info__name">瑶妹（先生）</span>
        <span class="top__receiver__info__name">18911024266</span>
      </div>
      <div class="top__receiver__icon iconfont">
        &#xe6db;
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'TopArea',
  setup () {
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    return {
      handleBackClick
    }
  }
}
</script>

<style lang="scss" scoped>
  .top {
    position: relative;
    height: 1.96rem;
    background-size: 100% 1.59rem;
    background: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%) no-repeat;
    .top__header {
      position: relative;
      padding-top: .2rem;
      line-height: .24rem;
      font-size: .16rem;
      color: white;
      text-align: center;
      .top__header__icon {
        position: absolute;
        left: .19rem;
        font-size: .3rem;
      }
    }
    .top__receiver {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1.11rem;
      background: white;
      margin: 0 .18rem;
      .top__receiver__title {
        padding: .16rem 0 .14rem .16rem;
        line-height: .22rem;
        font-size: .16rem;
        color: #333333;
        font-weight: bold;
      }
      .top__receiver__address {
        padding-left: .16rem;
        line-height: .2rem;
        font-size: .14rem;
      }
      .top__receiver__info {
        padding: .06rem 0 .16rem .16rem;
        .top__receiver__info__name {
          line-height: .18rem;
          font-size: .12rem;
          color: #666666;
          margin-right: .06rem;
        }
      }
      .top__receiver__icon {
        transform: rotate(180deg);
        position: absolute;
        top: .5rem;
        right: .16rem;
        color: #999999;
        font-size: .2rem;
      }
    }
  }
</style>
