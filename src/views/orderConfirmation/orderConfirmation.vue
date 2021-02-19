<template>
  <div class="order__wrapper">
    <top-area></top-area>
    <product-list></product-list>
    <order></order>
  </div>
</template>

<script>
import TopArea from './TopArea'
import ProductList from './ProductList'
import Order from './Order'
export default {
  name: 'orderConfirmation',
  components: { Order, ProductList, TopArea }
}
</script>

<style lang="scss" scoped>
  .order__wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #eeeeee;
  }
</style>
