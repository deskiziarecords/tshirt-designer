<script setup lang="ts">
import { useTextStore } from '@/store/text';
import { useTshirtStore } from '~~/store/tshirtStore';
import { ObjectEvents } from "fabric/dist/src/EventTypeDefs"
import { Textbox } from 'fabric'
import debounce from 'lodash/debounce'

const store = useTshirtStore()
const textStore = useTextStore()

console.log('TEST', textStore.$state)

const addText = debounce((event: any) => {
  const value = event.target.value
  store.text = value
  store.tshirt?.addText(value, textStore.$state)
  store.tshirt.text = value
}, 1000)

onMounted(() => {
  store.tshirt?.tshirt?.on('selection:updated', (event: ObjectEvents) => {
    console.log('selection:updated')
    const obj = event.selected[0]
    store.text = obj instanceof Textbox ? obj.text : ''
  })
})

const isBold = computed(() => {
  return textStore.fontWeight === 'bold'
})
const isItalic = computed(() => {
  return textStore.fontStyle === 'italic'
})
const isUnderline = computed(() => {
  return textStore.underline === true
})

const setFont = (key: String) => {
  if(key === 'bold') {
    textStore.fontWeight = textStore.fontWeight !== 'bold' ? 'bold': 'normal'
  }
  else if(key === 'italic') {
    textStore.fontStyle = textStore.fontStyle !== 'italic' ? 'italic': 'normal'
  }
  else if(key === 'underline') {
    textStore.underline = !textStore.underline
  }

  store.tshirt?.addText(store.text, textStore.$state)
}

</script>

<template>
  <div class="form-control mb-3">
    <label class="label">
      <span class="label-text">Input Text</span>
    </label>
    <textarea :value="store.text" @input="addText($event)" class="textarea textarea-primary textarea-bordered h-24" placeholder="input text"></textarea>
  </div>
  <div class="form-control">
    <div class="btn-group">
      <button class="btn btn-outline border-r-0" :class="{'btn-active': isBold}" @click="setFont('bold')">Bold</button>
      <button class="btn btn-outline border-r-0" :class="{'btn-active': isItalic}" @click="setFont('italic')">Italic</button>
      <button class="btn btn-outline" :class="{'btn-active': isUnderline}" @click="setFont('underline')">Underline</button>
    </div>
  </div>
</template>