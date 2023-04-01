import { defineStore } from 'pinia'
import { Tshirt } from '~~/composables/Tshirt'
import { Canvas } from 'fabric'

export const useTshirtStore = defineStore({
  id: 'tshirt-store2',
  state: () => {
    return {
      page: 'depan' as String,
      type: null as null|String, // text, textbox, image, path
      text: null as null|String,
      tshirt: null as null|Tshirt,
      canvas: null as null|Canvas,
    }
  },
  actions: {
    initCanvas(id: string, options: Object) {
      const canvas = new Canvas(id, options)

    }
  },
  getters: {
    isText(state) {
      return state.type === 'text' || state.type === 'text'
    },
    isImage(state) {
      return state.type === 'image'
    }
  },
})
