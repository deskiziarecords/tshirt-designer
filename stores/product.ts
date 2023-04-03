import { defineStore } from 'pinia'
import products from '~~/content/products'
import { useTshirtStore } from './tshirt'

interface IProduct{ [key: string]: string }

export const useProductStore = defineStore('product-store', () => {
  const current = ref<IProduct>({})
  const color = ref<string>('#000000')
  const store = useTshirtStore()

  const init = () => {
    setProduct(products[0])
  }

  const setProduct = (p: IProduct) => {
    current.value = p
  }

  const changeColor = (_color: string) => {
    color.value = _color
    store.changeColor(_color)
  }

  return {current, color, init, changeColor, setProduct}
})
