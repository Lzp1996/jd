<template>
  <div class="nearby">
    <h2 class="nearby__title">附近店铺</h2>
    <div class="nearby__item" v-for="(item, index) of nearbyList" :key="index">
      <img class="nearby__img" :src="item.imgUrl" alt="">
      <div class="nearby__content">
        <div class="nearby__content__title">{{item.title}}</div>
        <div class="nearby__content__tags" >
          <span class="nearby__content__tag" v-for="(innerItem, innerIndex) in item.tags" :key="innerIndex">{{innerItem}}</span>
        </div>
        <div class="nearby__content__highlight">{{item.desc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nearby',
  setup () {
    const nearbyList = [{
      id: 1,
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      title: '沃尔玛',
      tags: ['月售1万+', '起送¥0', '基础运费¥5'],
      desc: 'VIP尊享满89元减4元运费券（每月3张）'
    }, {
      id: 2,
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      title: '沃尔玛',
      tags: ['月售1万+', '起送¥5', '基础运费¥5'],
      desc: 'VIP尊享满89元减4元运费券（每月3张）'
    }]
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
    .nearby__item{
      display: flex;
      padding-top: .14rem;
      .nearby__img {
        width: .56rem;
        height: .56rem;
        margin-right: .16rem;
      }
      .nearby__content{
        flex: 1;
        .nearby__title {
          font-size: .16rem;
          line-height: .22rem;
          color: #333333;
        }
        .nearby__content__tags {
          line-height: .18rem;
          font-size: .13rem;
          color: #333333;
          margin: .08rem 0;
          .nearby__content__tag {
            margin-right: .16rem;
          }
        }
        .nearby__content__highlight {
          line-height: .18rem;
          font-size: .13rem;
          color: #E93B3B;
          padding-bottom: .12rem;
          border-bottom: 1px solid #F1F1F1;
        }
      }
    }
  }

</style>
