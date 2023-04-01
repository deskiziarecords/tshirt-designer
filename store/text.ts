import { FabricObject } from 'fabric/dist/src/shapes/Object/FabricObject'
import { defineStore } from 'pinia'
import { useTshirtStore } from './tshirt'
import { Textbox } from 'fabric'

// interface TextObject

export const useTextStore = defineStore('text-store', () => {
  const store = useTshirtStore()
  const object = shallowRef<Object|FabricObject>({})

  const add = (_text: string, _options: Object = {}) => {
    const obj = store.canvas?.addText( _text, _options )
    store.canvas?.setActiveObject( obj )
    store.canvas?.renderAll()
    object.value = obj
  }

  return {object, add}
})
