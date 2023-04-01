import { defineStore, StateTree } from 'pinia'
import { Tshirt } from '~~/composables/Tshirt'

export const useTshirtStore = defineStore('tshirt-store', () => {

  const page = ref<string>('depan')

  const canvases = shallowReactive({
    depan: null as Tshirt| null,
    belakang: null as Tshirt| null,
  })


  const canvas = computed<Tshirt|null>(() => {
    if(page.value === 'depan' || page.value === 'belakang') {
      return canvases[page.value]
    }
    return null
  })

  function init (id: string) {
    onMounted(() => {
      const c = new Tshirt(id, {})
      
      saveCanvas(id, c)
    })
  }

  function saveCanvas (_page: string, _canvas: Tshirt|null) {
    if(_page === 'depan' || _page === 'belakang') {
      canvases[_page] = _canvas
    }
  }

  return {page, canvas, canvases, init}
})
