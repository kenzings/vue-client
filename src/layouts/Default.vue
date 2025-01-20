<template>
    <div>
        <header>
            <Navbar />
        </header>
        <main>
            <slot />
        </main>
        <footer class="bg-gray-900 text-white text-center py-4">
            &copy; <span>{{ currentYear }}</span> My Website. All rights reserved.
        </footer>
    </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';

import { ref, onMounted } from 'vue';

// Lấy năm hiện tại
const currentYear = ref(new Date().getFullYear());

// Tự động cập nhật năm nếu cần (khi chạy ứng dụng qua các năm)
onMounted(() => {
    const now = new Date();
    currentYear.value = now.getFullYear();
});
</script>

<style scoped></style>