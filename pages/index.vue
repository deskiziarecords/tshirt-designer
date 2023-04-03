<script lang="ts" setup>
import Tshirt from '../components/Tshirt.vue'
import { useTshirtStore } from '~~/stores/tshirt';
import { useTextStore } from '~~/stores/text';
import { Textbox } from "fabric";

const store = useTshirtStore()


  

</script>

<template>
  <div class="container">
    <div class="mb-4">
      <h1>Homepage</h1>
    </div>
    
    <tshirt ref="depan" page="depan" :is-show="store.page === 'depan'" />
    <tshirt ref="belakang" page="belakang" :is-show="store.page === 'belakang'" />

  </div>
</template>