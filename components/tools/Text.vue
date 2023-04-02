<script setup lang="ts">
import { useTextStore } from '~~/store/text'
import debounce from 'lodash/debounce'

const text = useTextStore()

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

</script>

<template>
  <div class="form-control mb-3">
    <label class="label">
      <span class="label-text">Input Text</span>
    </label>
    <textarea :value="text.text" @input="addText($event)" class="textarea textarea-primary textarea-bordered h-24" placeholder="input text"></textarea>
  </div>
  <div class="form-control">
    <div class="btn-group">
      <button class="btn btn-sm btn-outline border-r-0" :class="{'btn-active': isBold}" @click="setFont('bold')">Bold</button>
      <button class="btn btn-sm btn-outline border-r-0" :class="{'btn-active': isItalic}" @click="setFont('italic')">Italic</button>
      <button class="btn btn-sm btn-outline" :class="{'btn-active': isUnderline}" @click="setFont('underline')">Underline</button>
    </div>
  </div>
</template>