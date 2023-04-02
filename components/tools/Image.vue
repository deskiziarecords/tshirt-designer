<script setup lang="ts">
import { useTshirtStore } from '~~/store/tshirt'
import { uploadImage } from '~~/utils/helper'

const store = useTshirtStore()

const upload = async (event: any) => {
  const dataUrl = await uploadImage(event)

  store.canvas?.addImage( dataUrl )
}
</script>

<template>
  <div class="form-control mb-3">
    <input type="file" class="file-input file-input-bordered w-full max-w-xs" @input="upload($event)" />
  </div>
</template>