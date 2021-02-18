import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.setItem('cartList', cartListString)
}

const getLocaCartList = () => {
  // { shopId: {shopName:'', productList:{ productId: {} }}}
  return JSON.parse(localStorage.getItem('cartList')) || {}
}

export default createStore({
  state: {
    cartList: getLocaCartList()
    // carList: {shopId: { shopName:'', productList:{ productId: {}}}}
  },
  mutations: {
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo, num } = payload
      const shopInfo = state.cartList[shopId] || { shopName: '', productList: {} }
      let product = shopInfo.productList[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      product.count = product.count + num
      if (product.count < 0) {
        product.count = 0
      }
      product.selected = true
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeCartItemSelected (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.selected = !product.selected
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || { shopName: '', productList: {} }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
    },
    changeCleanCartList (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
    },
    setCartItemsSelected (state, payload) {
      const { shopId } = payload
      const productList = state.cartList[shopId].productList
      if (productList) {
        for (const key in productList) {
          const product = productList[key]
          product.selected = true
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
