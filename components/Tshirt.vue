<script lang="ts" setup>

import { useTshirtStore } from "~~/stores/tshirt";

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

const store = useTshirtStore()

store.init(props.page)

</script>

<template>
  <div class="flex justify-center">
    <div class="canvas-wrapper" v-show="isShow">
      <canvas :id="page" :width="width" :height="height"></canvas>
    </div>
  </div>
</template>