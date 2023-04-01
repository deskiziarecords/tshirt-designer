import { defineStore } from 'pinia'
import { Tshirt } from '~~/composables/Tshirt'

export const useTshirtStore = defineStore({
  id: 'tshirt-store',
  state: () => {
    return {
      page: 'depan' as String,
      type: null as null|String, // text, textbox, image, path
      text: null as null|String,
      tshirt: null as null|Tshirt
    }
  },
  actions: {
    //
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
