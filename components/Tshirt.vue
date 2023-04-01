<script lang="ts" setup>

import { Tshirt, useTshirt } from "../composables/Tshirt"
import {Canvas, Rect, Textbox} from 'fabric'
import debounce from 'lodash/debounce'
import { ObjectEvents } from "fabric/dist/src/EventTypeDefs"
import { FabricObject } from "fabric/dist/src/shapes/Object/FabricObject";
import { useTshirtStore } from "~~/store/tshirtStore";

const props = defineProps({
  page: {
    type: String,
    default: () => 'depan'
  },
  width: {
    default: () => 360
  },
  height: {
    default: () => 442
  },
  isShow: {
    default: () => false,
    type: Boolean
  }
})

const vtext = ref<string|null>(null)
const tshirt = shallowRef<Tshirt|null>(null)
const store = useTshirtStore()

onMounted(()=> {
  if( (tshirt.value instanceof Tshirt) ) {
    tshirt.value = null
  }
  
  tshirt.value = useTshirt(props.page)
  
  // test
  // tshirt.value.add(
  //   new Rect({width: 100, height: 100, globalCompositeOperation: 'source-atop'})
  // )
  // tshirt.value.renderAll()

  tshirt.value.on('selection:created', function(event: ObjectEvents){
    // console.log('selection:created', event)
    const obj = event.selected[0]
    console.log('type', obj.type)
    vtext.value = obj instanceof Textbox ? obj.text : ''
    store.type = obj.type
  })

  tshirt.value.on('selection:updated', (event: ObjectEvents) => {
    // console.log('selection:updated')
    const obj = event.selected[0]
    vtext.value = obj instanceof Textbox ? obj.text : ''
  })

  tshirt.value.on('selection:cleared', (event: ObjectEvents) => {
    const obj = event.deselected[0]
    vtext.value = ''
  })

})

const addText = debounce(function(value: any, options){
  const object: InstanceType<typeof FabricObject> = tshirt.value?.getActiveObject()
  if(value === '') {
    tshirt.value?.remove(object)
    return
  }
  tshirt.value?.addText(value, options)
}, 700)

watch(vtext, (value) => store.text = value)

defineExpose({
  tshirt,
  text: vtext,
  addText
})
</script>

<template>
  <div class="flex justify-center">
    <div class="canvas-wrapper" v-show="isShow">
      <canvas :id="page" :width="width" :height="height"></canvas>
    </div>
  </div>
</template>