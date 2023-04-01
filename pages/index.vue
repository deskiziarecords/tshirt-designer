<script lang="ts" setup>
import Tshirt from '../components/Tshirt.vue'
import { useTshirtStore } from '~~/store/tshirt';

const depan = shallowRef<InstanceType<typeof Tshirt> | null>(null)
const belakang = shallowRef<InstanceType<typeof Tshirt> | null>(null)
const page = ref<String>('depan')
const store = useTshirtStore()

const tshirt = computed<InstanceType<typeof Tshirt> | null>(() => {
  if(page.value === 'depan') {
    return depan.value
  }
  else if(page.value === 'belakang'){
    return belakang.value
  }
  else{
    return null
  }
})

const addText = (event: any, options: Object) => {
  tshirt.value?.addText(event, options)
}

const flip = (_page: String) => {
  tshirt.value?.tshirt.discardActiveObject()
  tshirt.value?.tshirt?.renderAll()
  
  store.$patch({
    text: '',
    page: page.value,
    tshirt: tshirt
  })

  page.value = _page
  
}

// watch(tshirt, (value) => {
//   store.$patch({
//     page: page.value,
//     tshirt: tshirt
//   })

// })

defineExpose({
  tshirt
})

</script>

<template>
  <div class="container">
    <div class="mb-4">
      <h1>Homepage</h1>
    </div>
    
    <tshirt ref="depan" page="depan" :is-show="page === 'depan'" />
    <!-- <tshirt ref="belakang" page="belakang" :is-show="page === 'belakang'" /> -->
  
    <div class="page-nav d-flex flex-column bd-highlight ">
      <a href="#" @click.prevent="flip('depan')" class="btn" >
        DEPAN
        <!-- <img :src="designer.product.mockup+'depan.png'" alt="Depan"> -->
      </a>
      <span class="mx-4">|</span>
      <a href="#" @click.prevent="flip('belakang')" class="btn" >
        BELAKANG
        <!-- <img :src="designer.product.mockup+'belakang.png'" alt="Belakang"> -->
      </a>
    </div>
  </div>
</template>