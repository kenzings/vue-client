<template>
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="sr-only">Products featured</h2>
  
        <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <ProductCard 
            v-for="product in featuredProducts" 
            :key="product.id" 
            :product="product" 
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { ref } from 'vue';
import ProductCard from '@/components/products/ProductCard.vue';
import type { Product } from '@/types/Product';
import ProductsData from '@/data/products.json';

const products = ref<Product[]>(ProductsData.products);
const featuredProducts = products.value.filter(product => product.featured);
  </script>
  