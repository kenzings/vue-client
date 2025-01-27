<template>
    <div class="bg-white rounded-lg shadow overflow-hidden">
        <!-- Post Image -->
        <img :src="post.image" :alt="post.title" class="w-full object-cover" />

        <!-- Post Content -->
        <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-900 truncate">
                {{ post.title }}
            </h3>
            <p class="mt-2 text-sm text-gray-600">
                {{ post.summary }}
            </p>
            <RouterLink :to="{name: 'PostDetail', params: {id: post.id}}" class="mt-4 inline-block text-sm font-medium text-indigo-600 hover:underline">
                Read more
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Post } from '@/types/Post';

defineProps<{
  post: Post;
}>();
</script>

<style scoped>
/* Nếu cần thêm style tùy chỉnh */
</style>