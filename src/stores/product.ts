import axios from 'axios'
import { defineStore } from 'pinia'

interface Product {
  id: number
  title: string
  price: number
}

export type RootState = {
  products: Product[]
  loading: boolean
  error: any
}

export const useProductStore = defineStore({
  id: 'product',
  state: () =>
    ({
      products: [],
      loading: false,
      error: null
    } as RootState),
  getters: {
    getProducts: (state) => state.products
  },
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
    }
  }
})
