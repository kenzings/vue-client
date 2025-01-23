<template>
  <div class="group">
    <img :src="product.image" :alt="`${product.name }`"
      class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]" />
    <RouterLink :to="{ name: 'ProductDetail', params: { id: product.id }}" class="mt-4 block text-sm font-medium text-gray-700 hover:text-blue-500">
      {{ product.name }}
    </RouterLink>
    <p class="mt-1 text-lg font-medium text-gray-900">{{ product.price }}</p>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Product } from '@/types/Product';

defineProps<{
  product: Product;
}>();
</script>

<style scoped>
/* Hiệu ứng hover */
.group:hover img {
  transition: opacity 0.3s ease-in-out;
}

.group:hover .text-gray-700 {
  text-decoration: underline;
  color: #1d4ed8;
  /* Xanh đậm */
}

/* Điều chỉnh khoảng cách */
.mt-4 {
  margin-top: 1rem;
}

.mt-1 {
  margin-top: 0.25rem;
}
</style>
