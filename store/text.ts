import { defineStore } from 'pinia'

export const useTextStore = defineStore({
  id: 'text-store',
  state: () => {
    return {
      text: 'TEST',
      fontSize: 20,
      fontFamily: 'Arial',
      underline: false,
      fontWeight: 'normal',
      fontStyle: 'none',
      underline: false,
    }
  },
  actions: {
    //
  },
  getters: {
    //
  },
})
