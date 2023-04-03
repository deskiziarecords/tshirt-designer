<script setup lang="ts">
import { useTextStore } from '~~/stores/text.ts';
import { useTshirtStore } from '~~/stores/tshirt';
import debounce from 'lodash/debounce'
import {colors} from '~~/content/colors'

const text = useTextStore()
const tshirt = useTshirtStore()
const colorPicker = ref<HTMLInputElement|null>(null)
const showPickerColor = ref<Boolean>(false)

const isBold = computed(() => {
  return text.options.fontWeight === 'bold'
})
const isItalic = computed(() => {
  return text.options.fontStyle === 'italic'
})
const isUnderline = computed(() => {
  return text.options.underline === true
})

const addText = debounce(function(event: any) {
  text.add(event.target.value)
}, 1000)

const setFont = (key: String) => {
  if(key === 'bold') {
    text.options.fontWeight = text.options.fontWeight !== 'bold' ? 'bold': 'normal'
  }
  else if(key === 'italic') {
    text.options.fontStyle = text.options.fontStyle !== 'italic' ? 'italic': 'normal'
  }
  else if(key === 'underline') {
    text.options.underline = !text.options.underline
  }
}

const pickColor = () => {
  showPickerColor.value = !showPickerColor.value
  if( showPickerColor ){
    colorPicker.value?.click()
  }
}

const changeColor = (color: string) => {
  if(color) {
    console.log('color', color)
    text.options.fill = color
    const obj = tshirt.canvas?.getActiveObject()
    if( obj ) {
      obj?.set({ fill: color})
      tshirt.canvas?.renderAll()
    }
  }
}

</script>

<template>
  <div class="form-control mb-3">
    <div class="btn-group mb-2 relative">
      <div v-show="false"></div>
      <button class="btn btn-sm btn-outline border-r-0 text-lg rounded-none" :class="{'btn-active': isBold}" @click="setFont('bold')"><Icon name="ic:baseline-format-bold" /></button>
      <button class="btn btn-sm btn-outline border-r-0 text-lg" :class="{'btn-active': isItalic}" @click="setFont('italic')"><icon name="ic:baseline-format-italic"/></button>
      <button class="btn btn-sm btn-outline border-r-0 text-lg" :class="{'btn-active': isUnderline}" @click="setFont('underline')"><icon name="ic:baseline-format-underlined"/></button>
      <button class="btn btn-sm btn-outline text-lg relative" :class="{'btn-active': showPickerColor}" @click="pickColor()">
        <span class="absolute w-2.5 h-2.5 -right-1 -top-1 rounded-full border" :style="{'background-color': text.options.fill}"></span>
        <icon name="ion:color-fill" />
      </button>
      <div class="card w-80 bg-base-200 shadow-lg absolute top-9 -left-1" v-show="showPickerColor">
        <div class="card-body p-2">
          <div class="flex flex-wrap">
            <div v-for="(c, i) in colors" :key="i" 
              @click="changeColor(c)"
              class="w-8 h-8 m-1 rounded-full border border-slate-400 cursor-pointer" 
              :style="{'background-color': c}">
            </div>
          </div>
          <div class="card-actions justify-end">
            <button class="btn btn-sm" @click="showPickerColor = false">Ok</button>
          </div>
        </div>
      </div>

    </div>
    

    <textarea :value="text.text" @input="addText($event)" class="textarea textarea-bordered h-24" placeholder="input text"></textarea>
  </div>
  <div class="form-control">
    
  </div>
</template>