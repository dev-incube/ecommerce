import request from '../../utils/request'
import uuidv4 from 'uuid/v4'
export const cart = {
  state: {
    cartItems: [],
    totalPrice: 0,
    cartId: null
  },
  reducers: {
    setCartItems(state, payload) {
      return {
        ...state,
        cartItems: payload
      }
    },
    setTotalPrice(state, payload) {
      return {
        ...state,
        totalPrice: payload
      }
    },
    setCartId(state, payload) {
      return {
        ...state,
        cartId: payload
      }
    }
  },
  effects: (dispatch) => ({
    async getCartId(payload, rootState) {
      let cartId = rootState.cart.cartId
      if (cartId) {
        return Promise.resolve(cartId)
      }

      try {
        const customer = await dispatch.user.getUser()
        cartId = customer.id
      } catch (e) {
        // cannot get customer
        // try get cartId from localStorage
        cartId = localStorage.getItem('cartId')
        if (!cartId) {
          // generate cart id
          cartId = uuidv4()
          localStorage.setItem('cartId', cartId)
        }
      }

      return Promise.resolve(cartId)
    },
    async getCartItemsAsync(payload, rootState) {
      // try get user info
      const cartId = await dispatch.cart.getCartId()
      const res = await request.get(`/carts/${cartId}/items?include=product`)
      const cleanData = res.data.data.map((item) => {
        return {
          id: item.id,
          productId: item.product_id,
          amount: item.quantity,
          name: item.name,
          image: 'https://via.placeholder.com/300x400.png',
          totalPrice: item.meta.display_price.with_tax.value.formatted,
          pricePerUnit: item.meta.display_price.with_tax.unit.formatted,
        }
      })
      const totalPrice = res.data.meta.display_price.with_tax.amount / 100
      dispatch.cart.setCartItems(cleanData)
      dispatch.cart.setTotalPrice(totalPrice)
    },
    async addItem(payload, rootState) {
      const cartId = await dispatch.cart.getCartId()
      await request.post(`/carts/${cartId}/items`, {
        data: payload
      })
      await dispatch.cart.getCartItemsAsync()
    },
    async deleteItem(payload, rootState) {
      const cartId = await dispatch.cart.getCartId()
      await request.delete(`/carts/${cartId}/items/${payload.id}`)
      await dispatch.cart.getCartItemsAsync()
    },
    async deleteCart(payload, rootState) {
      const cartId = await dispatch.cart.getCartId()
      await request.delete(`/carts/${cartId}`)
      await dispatch.cart.getCartItemsAsync()
    },
    async checkoutAsync(payload, rootState) {
      const cartId = await dispatch.cart.getCartId()
      const result = await request.post(`/carts/${cartId}/checkout`, {
        data: payload
      })
      return Promise.resolve(result.data.data)
    },
  })
}