import { FabricObject } from 'fabric/dist/src/shapes/Object/FabricObject'
import { defineStore } from 'pinia'
import { useTshirtStore } from './tshirt'
import { ITextOptions } from '~~/types/ITshirt'

interface OptionsRecord {[key: string] : string|Boolean}

export const useTextStore = defineStore('text-store', () => {
  const store = useTshirtStore()
  const object = shallowRef<Object|FabricObject>({})
  const text = ref<string>('')
  const options = reactive<OptionsRecord>({
    fontStyle: 'normal',
    fontWeight: 'normal',
    underline: false,
  })

  const add = (_text: string, _options: Object = {}) => {
    const obj = store.canvas?.addText( _text, options)
    text.value = _text
    object.value = obj
    return obj
  }

  return {
    object,
    text,
    options,
    add
  }
})
