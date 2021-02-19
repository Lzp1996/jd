import { useStore } from 'vuex'
import { computed } from 'vue'

export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', {
      shopId, productId, productInfo, num
    })
  }

  const results = computed(() => {
    const result = { total: 0, price: 0, allChecked: true }
    const productList = cartList[shopId]?.productList
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        result.total += product.count
        if (product.selected) {
          result.price += (product.price * product.count)
        }
        if (product.count > 0 && !product.selected) {
          result.allChecked = false
        }
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })

  const productList = computed(() => {
    const productList = cartList?.[shopId]?.productList || {}
    const notEmptyProductList = {}
    for (const i in productList) {
      const product = productList[i]
      if (product.count > 0) {
        notEmptyProductList[i] = product
      }
    }
    return notEmptyProductList
  })

  const shopName = computed(() => {
    return cartList[shopId].shopName || ''
  })

  return { cartList, shopName, changeCartItemInfo, results, productList }
}
