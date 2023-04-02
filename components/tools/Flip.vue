<script setup lang="ts">
import { useTshirtStore } from '~~/store/tshirt'

const store = useTshirtStore()

</script>

<template>
  <div class="page-nav d-flex flex-column bd-highlight text-center mt-4">
    <a href="#" @click.prevent="store.flip('depan')" class="btn" >
      DEPAN
      <!-- <img :src="designer.product.mockup+'depan.png'" alt="Depan"> -->
    </a>
    <span class="mx-4">|</span>
    <a href="#" @click.prevent="store.flip('belakang')" class="btn" >
      BELAKANG
      <!-- <img :src="designer.product.mockup+'belakang.png'" alt="Belakang"> -->
    </a>
  </div>
</template>