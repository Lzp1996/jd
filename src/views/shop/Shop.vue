<template>
    <div class="wrapper">
      <div class="search">
        <div class="search__back iconfont" @click="handleToHome">&#xe6db;</div>
        <div class="search__content">
          <div class="search__content__icon iconfont">&#xe60c;</div>
          <input
            class="search__content__input"
            placeholder="请输入商品名称搜索"
            type="text"
          />
        </div>
      </div>
      <shop-info :item="item" :hideBorder="true" v-if="item.imgUrl"/>
      <shop-content></shop-content>
    </div>
</template>

<script>
import ShopInfo from '../../components/ShopInfo'
import { useRouter, useRoute } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'
import ShopContent from './ShopContent'

const useShopInfoEffect = () => {
  const data = reactive({ item: {} })
  const route = useRoute()
  const getItemInfo = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result && result.errno === 0) {
      data.item = result.data
    } else {
      console.log('shopInfo error')
    }
  }
  const { item } = toRefs(data)
  return { item, getItemInfo }
}

const useBackRouterEffect = () => {
  const router = useRouter()
  const handleToHome = () => {
    router.push({ name: 'home' })
  }
  return handleToHome
}

export default {
  name: 'Shop',
  components: { ShopContent, ShopInfo },
  setup () {
    // const item = {
    //   id: 1,
    //   imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
    //   name: '沃尔玛',
    //   sales: 10000,
    //   expressPrice: 5,
    //   expressLimit: 0,
    //   tags: ['月售1万+', '起送¥0', '基础运费¥5'],
    //   slogan: 'VIP尊享满89元减4元运费券（每月3张）'
    // }
    const handleToHome = useBackRouterEffect()
    const { item, getItemInfo } = useShopInfoEffect()
    getItemInfo()
    return {
      handleToHome,
      item,
      getItemInfo
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    padding: 0 .18rem;
    .search {
      display: flex;
      margin: .14rem 0 .02rem 0;
      line-height: .32rem;
      .search__back {
        width: .3rem;
        font-size: .24rem;
        color: #B6B6B6;
      }
      .search__content {
        display: flex;
        flex: 1;
        background: #F5F5F5;
        border-radius: .16rem;
        .search__content__icon {
          position: relative;
          top: .01rem;
          width: .44rem;
          text-align: center;
          color: #B7B7B7;
        }
        .search__content__input {
          width: 100%;
          height: .32rem;
          line-height: .16rem;
          font-size: .14rem;
          color: #333333;
          border: none;
          outline: none;
          background: none;
          padding-right: .2rem;
          &::placeholder {
            color: #333333;
          }
        }
      }
    }
  }
</style>
