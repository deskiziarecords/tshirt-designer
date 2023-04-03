<script setup lang="ts">
import products from '~~/content/products'
import { useTshirtStore } from '~~/stores/tshirt'
import { useProductStore } from '~~/stores/product'
import {colors} from '~~/content/colors'

const store = useTshirtStore()
const product = reactive(useProductStore())
const showColorPicker = ref<Boolean>(false)

const changeColor = (color: string) => {
  product.color = color
  store.changeColor(color)
}


</script>

<template>
  <div class="flex justify-end relative">
    <button class="btn btn-sm btn-outline relative" :class="{'btn-active': showColorPicker}" @click="showColorPicker = !showColorPicker">
      <span class="absolute w-2.5 h-2.5 -right-1 -top-1 rounded-full border" :style="{'background-color': product.color}"></span>
      <icon name="ion:md-color-fill" size="18" />
    </button>
    <div class="card w-80 bg-base-200 shadow-lg absolute top-9 -left-1 z-40" v-show="showColorPicker">
        <div class="card-body p-2">
          <div class="flex flex-wrap">
            <div v-for="(c, i) in colors" :key="i" 
              @click="changeColor(c)"
              class="w-8 h-8 m-1 rounded-full border border-slate-400 cursor-pointer" 
              :style="{'background-color': c}">
            </div>
          </div>
          <div class="card-actions justify-end">
            <button class="btn btn-sm" @click="showColorPicker = false">Ok</button>
          </div>
        </div>
      </div>
  </div>
  <div class="divider"></div>
  <ul class="menu bg-base-100 w-full">
    <li v-for="(p, i) in products" :key="i" :class="{'bordered': p.slug === product.current.slug}">
      <a>
        <img :src="`${p.mockup}/depan.svg`" style="width:50px" />
        <span>{{ p.name }}</span>
      </a>
    </li>
  </ul>
</template>

<style scoped>

</style>