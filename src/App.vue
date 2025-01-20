<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import DefaultLayout from '@/layouts/Default.vue';
import AuthLayout from '@/layouts/Auth.vue';

// Mapping layout từ meta
const route = useRoute();
const layouts = {
  Default: DefaultLayout,
  Auth: AuthLayout,
} as const;

const layout = computed(() => layouts[route.meta.layout || 'Default']);
// ==================Tawk API===================
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = 'https://embed.tawk.to/6788c97e825083258e0631d1/1ihn566dg';
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  s0.parentNode.insertBefore(s1, s0);
})();

</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
