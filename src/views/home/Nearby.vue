<template>
  <div class="nearby">
    <h2 class="nearby__title">附近店铺</h2>
    <router-link :to="`/shop/${item._id}`" v-for="(item, index) of nearbyList" :key="index" >
      <shop-info :hide-border="false" :item="item"  />
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'

const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await get('/api/shop/hot-list')
    if (result && result.errno === 0) {
      nearbyList.value = result.data
    } else {
      console.log('获取商家失败')
    }
  }
  return { nearbyList, getNearbyList }
}
export default {
  name: 'Nearby',
  components: { ShopInfo },
  setup () {
    const { nearbyList, getNearbyList } = useNearbyListEffect()
    getNearbyList()
    // const nearbyList = [{
    // name
    // sales
    //  slogan
    // expressPrice
    // expressLimit
    //   id: 1,
    //   imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
    //   title: '沃尔玛',
    //   tags: ['月售1万+', '起送¥0', '基础运费¥5'],
    //   desc: 'VIP尊享满89元减4元运费券（每月3张）'
    // }, {
    //   id: 2,
    //   imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
    //   title: '沃尔玛',
    //   tags: ['月售1万+', '起送¥5', '基础运费¥5'],
    //   desc: 'VIP尊享满89元减4元运费券（每月3张）'
    // }]
    return { nearbyList }
  }
}
</script>

<style lang="scss" scoped>
  .nearby {
    &__title {
      margin: .16rem 0 .02rem 0;
      line-height: 25px;
      font-size: 18px;
      font-weight: normal;
      color: #333333;
    }
    a {
      text-decoration: none;
    }
  }

</style>
