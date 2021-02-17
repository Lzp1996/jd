<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe648;</span>
    北京理工大学国防科技园2号楼10层
    <span class="iconfont position__notice">&#xe630;</span>
  </div>
  <div class="search">
    <span class="iconfont">&#xe60c;</span>
    <input type="text" placeholder="山姆会员商店优惠商品">
  </div>
  <div class="banner">
    <img
      class="banner__img"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
    />
  </div>
  <div class="icons">
    <div class="icons__item" v-for="(item, index) of iconsList" :key="index">
      <img class="icons__item__img" :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`" alt="">
      <div class="icons__item__desc">{{item.desc}}</div>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconsList = [
      { imgName: '超市', desc: '超市便利' },
      { imgName: '菜市场', desc: '菜市场' },
      { imgName: '水果店', desc: '水果店' },
      { imgName: '鲜花', desc: '鲜花绿植' },
      { imgName: '医药健康', desc: '医药健康' },
      { imgName: '家居', desc: '家居时尚' },
      { imgName: '蛋糕', desc: '烘培蛋糕' },
      { imgName: '签到', desc: '签到' },
      { imgName: '大牌免运', desc: '大牌免运' },
      { imgName: '红包', desc: '红包套餐' }
    ]
    return {
      iconsList
    }
  }
}
</script>

<style lang="scss" scoped>
  .position {
    position: relative;
    padding: .16rem .24rem .16rem 0;
    line-height: .22rem;
    font-size: .16rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .position__icon {
      position: relative;
      top: .01rem;
      font-size: .2rem;
    }
    .position__notice {
      position: absolute;
      top: .17rem;
      right: 0;
      font-size: .2rem;
    }
  }
  .search {
    display: flex;
    line-height: .32rem;
    margin-bottom: .12rem;
    color: #B7B7B7;
    background-color: #F5F5F5;
    border-radius: .16rem;
    overflow: hidden;
    font-size: .14rem;
    .iconfont {
      display: inline-block;
      padding: 0 0 0 .16rem;
      font-size: .16rem;
    }
    input {
      flex: 1;
      outline: none;
      border: none;
      background-color: #F5F5F5;
      padding: 0 .12rem 0 .12rem;
    }
  }
  .banner {
    width: 100%;
    height: 0;
    padding-bottom: 25.4%;
    overflow: hidden;
    .banner__img {
      width: 100%;
    }
  }
  .icons {
    display: flex;
    flex-wrap: wrap;
    margin-top: 16px;
    .icons__item {
      width: 20%;
      .icons__item__img {
        display: block;
        margin: 0 auto;
        width: .4rem;
        height: .4rem;
      }
      .icons__item__desc {
        text-align: center;
        margin: 0.01rem 0 0.16rem 0;
      }
    }
  }
  .gap {
    height: .1rem;
    margin: 0 -0.18rem;
    background-color: #F1F1F1;
  }
</style>
