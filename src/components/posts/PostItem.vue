<template>
    <div class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ post.title }}</h1>
        <img :src="post.image" alt="Post Image" class="w-full h-64 object-cover rounded-lg mb-4" />
        <p class="text-gray-600 leading-relaxed text-lg">
            {{ post.content }}
        </p>
    </div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true,
        },
    },
};
</script>
