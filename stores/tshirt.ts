import { defineStore } from 'pinia'
import { Tshirt } from '~~/composables/Tshirt'
import { useTextStore } from './text'

export const useTshirtStore = defineStore('tshirt-store', () => {
  interface CanvasesRecord {
    [key: string] : null|Tshirt
  }

  const page = ref<string>('depan')
  const tab = ref<string>('text')
  const text = reactive( useTextStore() )

  const canvases = shallowReactive<CanvasesRecord>({
    depan: null,
    belakang: null,
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
      canvasEvent(c)
      saveCanvas(id, c)
    })
  }

  function saveCanvas (_page: string, _canvas: Tshirt|null) {
    if(_page === 'depan' || _page === 'belakang') {
      canvases[_page] = _canvas
    }
  }

  function flip (_page: string) {
    canvas.value?.discardActiveObject()
    canvas.value?.renderAll()
    text.text = ''
    text.object = {}

    saveCanvas(page.value, canvas.value)
    page.value = _page
  }

  const canvasEvent = (_canvas: Tshirt) => {
    _canvas?.on('selection:updated', _updateTextObject)
    _canvas?.on('selection:created', _updateTextObject)
    _canvas?.on('text:changed', (event: any) => {
      const obj = event.target
      text.text = obj.text
      text.object = obj
    })
    _canvas?.on('before:selection:cleared', () => {
      text.text = ''
    })
  }

  const _updateTextObject = (event: any) => {
    const obj = event.selected[0]

    if( obj.isType('textbox')  ) {
      text.text = obj.text
      Object.keys(text.options).forEach(key => {
        text.options[key] = obj[key]
      })
      text.object = obj
      tab.value = 'text'
    }
    else if( obj.isType('image')) {
      text.text = ''
      tab.value = 'image'
    }

  }

  watch(text.options, (value, old) => {
    if(text.text !== '') {
      canvas.value?.addText(text.text, value)
    }
  })

  return {page, tab, canvas, canvases, init, flip}
})
