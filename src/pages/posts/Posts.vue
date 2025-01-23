<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <PostCard v-for="post in posts" :key="post.id" :post="post" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PostCard from '@/components/posts/PostCard.vue';
import type { Post } from '@/types/Post';
import PostsData from '@/data/posts.json';
const posts = ref<Post[]>([]);
onMounted(() => {
    // products.value = productsData.products;
    posts.value = PostsData.posts;
});
</script>

<style scoped></style>