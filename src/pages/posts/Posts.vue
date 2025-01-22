<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <PostCard v-for="post in posts" :key="post.id" :post="post" />
        </div>
    </div>
</template>

<script setup lang="ts">
import PostCard from '@/components/posts/PostCard.vue';

const posts = [
    {
        id: 1,
        title: 'News Title 1',
        summary: 'This is a summary of the news post 1.',
        image: 'https://www.greatplacetowork.com/templates/gptw/images/no-image-available.jpg',
        link: { name: 'PostDetail', params: { id: 1 } },
    },
    {
        id: 2,
        title: 'News Title 2',
        summary: 'This is a summary of the news post 2.',
        image: 'https://www.greatplacetowork.com/templates/gptw/images/no-image-available.jpg',
        link: { name: 'PostDetail', params: { id: 2 } },
    },
    {
        id: 3,
        title: 'News Title 3',
        summary: 'This is a summary of the news post 3.',
        image: 'https://www.greatplacetowork.com/templates/gptw/images/no-image-available.jpg',
        link: { name: 'PostDetail', params: { id: 3 } },
    },
];
</script>

<style scoped></style>