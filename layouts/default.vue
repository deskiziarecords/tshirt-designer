<script setup lang="ts">
import Text from '../components/tools/Text.vue'
import Flip from '../components/tools/Flip.vue'
import Image from '../components/tools/Image.vue'
import Product from '../components/tools/Product.vue'
import { useTshirtStore } from '~~/stores/tshirt';

const store = useTshirtStore()

const setInputType = (type: string) => {
  store.tab = type
}

</script>
<template>
  <div class="navbar bg-base-100 border border-l-0">
    <div class="flex-1">
      <span>OBLONG</span>
    </div>
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span class="badge badge-sm indicator-item">8</span>
          </div>
        </label>
        <div tabindex="0" class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
          <div class="card-body">
            <span class="font-bold text-lg">8 Items</span>
            <span class="text-info">Subtotal: $999</span>
            <div class="card-actions">
              <button class="btn btn-primary btn-block">View cart</button>
            </div>
          </div>
        </div>
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="drawer drawer-mobile">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <div class="text-center">
        <!-- <label for="my-drawer" class="btn btn-primary drawer-button">Open drawer</label> -->
        <slot></slot>

      </div>

      <flip></flip>

    </div> 
    <div class="drawer-side">
      <!-- <label for="my-drawer" class="drawer-overlay"></label> -->
      <div class="flex">
        <div class="w-24 border-r shadow-xl relative">
          <ul class="menu bg-base-100">
            <li>
              <a @click="setInputType('text')" class="justify-center text-2xl" :class="{'active': store.tab === 'text'}">
                <icon name="iconoir:text-alt" />
              </a> 
            </li>
            <li>
              <a @click="setInputType('image')" class="justify-center text-2xl" :class="{'active': store.tab === 'image'}">
                <icon name="ion:md-images" />
              </a> 
            </li>
            <li>
              <a @click="setInputType('product')" class="justify-center text-2xl" :class="{'active': store.tab === 'product'}">
                <icon name="ion:shirt" />
              </a>
            </li>
          </ul>
        </div>
        <div class="w-80 bg-base-100 text-base-content py-4 bg-slate-100">
          <!-- Sidebar content here -->
  
          <div class="p-4">
            <Text v-if="store.tab === 'text'" />
            <Image v-if="store.tab === 'image'" />
            <Product v-if="store.tab === 'product'" />
          </div>
          
        </div>
      </div>


    </div>
  </div>
</template>
