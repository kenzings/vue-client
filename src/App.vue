<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import DefaultLayout from '@/layouts/Default.vue';
import AuthLayout from '@/layouts/Auth.vue';
import  { SpeedInsights }  from "@vercel/speed-insights/dist/vue"

// Khai báo type cho Tawk_API
declare global {
  interface Window {
    Tawk_API?: any;
  }
}

// Mapping layout từ meta
const route = useRoute();
const layouts = {
  Default: DefaultLayout,
  Auth: AuthLayout,
} as const;

const layout = computed(() => layouts[route.meta.layout as keyof typeof layouts || 'Default']);

// Tawk API
window.Tawk_API = window.Tawk_API || {};
(function () {
  const s1 = document.createElement("script");
  const s0 = document.getElementsByTagName("script")[0];
  if (s0 && s0.parentNode) {
    s1.async = true;
    s1.src = 'https://embed.tawk.to/6788c97e825083258e0631d1/1ihn566dg';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
  }
})();
</script>

<template>
  <SpeedInsights />
  <component :is="layout">
    <RouterView />
  </component>
</template>