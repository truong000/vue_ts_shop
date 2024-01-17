import axios from 'axios'
import { defineStore } from 'pinia'

interface Product {
  id: number
  title: string
  price: number
}
interface CartItem {
  productId: number
  quantity: number
}

interface Cart {
  cartItems: CartItem[]
  totalPrice: number
  totalProduct: number
}
export type RootState = {
  products: Product[]
  cart?: Cart
  loading: boolean
  error: any
}

export const useCartStore = defineStore({
  id: 'store',
  state: () =>
    ({
      products: [],
      cart: {
        cartItems: [],
        totalPrice: 0,
        totalProduct: 0
      },
      loading: false,
      error: null
    } as RootState),

  getters: {
    countItem: (state) => state.cart?.cartItems.length
  },

  actions: {
    async fetchCartList() {
      const cart = await axios.get(`http://localhost:3000/cart`)
      this.cart = cart.data
    },

    async addProductToCart(productId: number, price: number) {
      this.loading = true
      try {
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const cartItem = this.cart?.cartItems.find((cartItem) => cartItem.productId === productId)

        if (cartItem) {
          // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
          cartItem.quantity++
          this.increaseCartTotalPrice(price)
          this.increaseCartTotalProduct(1)

          await axios
            .put('http://localhost:3000/cart', this.cart)
            .then((response) => console.log(response))
            .catch((error) => console.error(error))
        } else {
          this.addCartItem(productId)
          this.increaseCartTotalPrice(price)
          this.increaseCartTotalProduct(1)
          await axios
            .put('http://localhost:3000/cart', this.cart)
            .then((response) => console.log(response))
            .catch((error) => console.error(error))
        }
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async updateItemInCart(productId: number, price: number) {
      this.loading = true
      try {
        const cartItem = this.cart?.cartItems.find((cartItem) => cartItem.productId === productId)

        if (cartItem) {
          cartItem.quantity--
          this.decreasePriceProduct(price)

          await axios
            .put('http://localhost:3000/cart', this.cart)
            .then((response) => console.log(response))
            .catch((error) => console.error(error))
        }
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    increaseCartTotalPrice(price: number) {
      if (this.cart) {
        this.cart.totalPrice += price
      }
    },
    increaseCartTotalProduct(quantity: number) {
      if (this.cart) {
        this.cart.totalProduct += quantity
      }
    },

    decreasePriceProduct(price: number) {
      if (this.cart) {
        this.cart.totalPrice -= price
      }
    },

    addCartItem(productId: number) {
      this.cart?.cartItems.push({ productId, quantity: 1 })
    },

    async removeItemCart(productId: number) {
      const cartItemIndex = this.cart?.cartItems.findIndex((item) => item.productId === productId)

      if (cartItemIndex !== -1 && cartItemIndex !== undefined) {
        const cartItem = this.cart!.cartItems[cartItemIndex]
        console.log('cartItem', cartItem)
        await this.decreaseCartTotalPrice(cartItem)
        console.log('cart123', this.cart)
        await this.decreaseCartTotalProduct(cartItem.quantity)
        this.cart!.cartItems.splice(cartItemIndex, 1)
        try {
          await axios
            .put('http://localhost:3000/cart', this.cart)
            .then((response) => console.log('response', response))
            .catch((error) => console.error(error))
        } catch (error) {
          this.error = []
        }
      }
    },

    async decreaseCartTotalPrice(cartItem: CartItem) {
      const res = await axios.get(`http://localhost:3000/products`)
      this.products = res.data
      const product = this.products.find((x) => x.id === cartItem.productId)
      if (product && this.cart) {
        this.cart.totalPrice -= product.price * cartItem.quantity
        console.log('totalPrice', this.cart)
      }
    },
    decreaseCartTotalProduct(quantity: number) {
      if (this.cart) {
        this.cart.totalProduct -= quantity
      }
    }
  }
})
