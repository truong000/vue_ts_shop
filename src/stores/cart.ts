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

export const useStoreShopping = defineStore({
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
  actions: {
    async fetchListProducts() {
      this.products = []
      this.loading = true
      try {
        const res = await axios.get(`http://localhost:3000/products`)
        this.products = res.data
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchProductDetails(id: number) {
      this.loading = true
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`)
        return res.data
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

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
          console.log('carrt', this.cart)
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
    // Tính toán tổng số sản phẩm và tổng giá trong giỏ hàng
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

    addCartItem(productId: number) {
      this.cart?.cartItems.push({ productId, quantity: 1 })
    }
  }
})
