<script lang="ts" setup>
import Tshirt from '../components/Tshirt.vue'

const depan = shallowRef<InstanceType<typeof Tshirt> | null>(null)
const belakang = shallowRef<InstanceType<typeof Tshirt> | null>(null)
const page = ref('depan')

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

const addText = (event: any) => {
  tshirt.value?.addText(event)
}

const flip = (_page: String) => {
  page.value = _page
}

onMounted(()=>{
  // setTimeout(() => {
  //   addText('DEPAN')
  //   page.value = 'belakang'
  //   addText('BELAKANG')
  //   setTimeout(() => {
  //     page.value = 'depan'
  //   }, 3000);
  // }, 3000);
})

</script>

<template>
  <div class="wrapper text-center">
    <div class="mb-4">
      <h1>Homepage</h1>
    </div>
    
    <tshirt ref="depan" page="depan" :is-show="page === 'depan'" />
    <tshirt ref="belakang" page="belakang" :is-show="page === 'belakang'" />
  
    <div class="text-center mb-4">
      <input :value="tshirt?.vtext" @keyup.enter="addText($event)" class="border"/>
    </div>
    <div class="page-nav d-flex flex-column bd-highlight ">
      <a href="#" @click.prevent="flip('depan')" class="" >
        DEPAN
        <!-- <img :src="designer.product.mockup+'depan.png'" alt="Depan"> -->
      </a>
      <span class="mx-4">|</span>
      <a href="#" @click.prevent="flip('belakang')" class="" >
        BELAKANG
        <!-- <img :src="designer.product.mockup+'belakang.png'" alt="Belakang"> -->
      </a>
    </div>

  </div>
</template>