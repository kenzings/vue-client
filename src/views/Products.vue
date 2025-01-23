<template>
    <div class="bg-gray-100 min-h-screen">
        <!-- Banner -->
        <div class="relative bg-cover bg-center h-64 flex items-center justify-center text-white"
            style="background-image: url('/public/bg/bg-pro-2.jpg');">
            <h1 class="text-4xl text-green-600 font-bold uppercase font-greatVibes">Products</h1>
        </div>

        <!-- Main Content -->
        <div class="container mx-auto px-4 py-8 grid grid-cols-12 gap-8">
            <!-- Sidebar Filters -->
            <aside class="col-span-3 bg-white rounded-lg shadow p-4">
                <h2 class="text-lg font-semibold mb-4">Filters</h2>
                <div>
                    <ul class="space-y-2">
                        <li v-for="category in categories" :key="category.id">
                            <label class="inline-flex items-center">
                                <input type="checkbox" class="form-checkbox h-5 w-5 text-indigo-600"
                                    :value="category.name" v-model="selectedCategories" />
                                <span class="ml-2 text-gray-700">{{ category.name }}</span>
                            </label>
                        </li>
                    </ul>
                </div>
            </aside>

            <!-- Product List -->
            <section class="col-span-9 bg-white rounded-lg shadow p-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <ProductCard v-for="product in paginatedProducts" :key="product.id" :product="product" />
                </div>

                <!-- Pagination -->
                <div class="mt-6 flex justify-center">
                    <button v-for="page in totalPages" :key="page" @click="currentPage = page"
                        :class="['px-4 py-2 mx-1 rounded', page === currentPage ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700']">
                        {{ page }}
                    </button>
                </div>
            </section>
        </div>

        <!-- News Section -->
        <div class="bg-gray-200 py-8">
            <div class="container mx-auto px-4">
                <h2 class="text-2xl font-semibold mb-4">Latest News</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- <article v-for="post in posts" :key="post.id" class="bg-white rounded-lg shadow p-4">
                        <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover rounded-lg mb-4" />
                        <h3 class="text-lg font-semibold mb-2">{{ post.title }}</h3>
                        <p class="text-gray-700 text-sm">{{ post.summary }}</p>
                        <RouterLink :to="post.link" class="text-indigo-600 hover:underline text-sm">Read more
                        </RouterLink>
                    </article> -->
                    <PostCard v-for="post in posts" :key="post.id" :post="post" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import ProductCard from '@/components/products/ProductCard.vue';
import PostCard from '@/components/posts/PostCard.vue';
import type { Product } from '@/types/Product';
import type { Post } from '@/types/Post';
import type { Categories } from '@/types/Categories';
import productsData from '@/data/products.json';
import postsData from '@/data/posts.json';
import categoriesData from '@/data/categories.json';
// Mock products
// const products = Array.from({ length: 45 }, (_, i) => ({
//     id: i + 1,
//     name: `Product ${i + 1}`,
//     href: '#',
//     price: `$${(Math.random() * 100).toFixed(2)}`,
//     imageSrc: 'https://via.placeholder.com/150',
//     imageAlt: `Product ${i + 1}`,
// }));


const products = ref<Product[]>([]);
// Mock posts
const posts = ref<Post[]>([]);

const selectedCategories = ref<string[]>([]);

onMounted(() => {
    products.value = productsData.products;
    posts.value = postsData.posts;
    categories.value = categoriesData.categories;
});

// Mock categories
const categories = ref<Categories[]>([]);

// Filtering
const filteredProducts = computed(() => {
    if (selectedCategories.value.length === 0) {
        return products.value;
    }
    return products.value.filter(product =>
        product.category && selectedCategories.value.includes(product.category)
    );
});

// Pagination logic
const currentPage = ref(1);
const itemsPerPage = 12; // Changed to 12 for better grid layout

const totalPages = computed(() =>
    Math.ceil(filteredProducts.value.length / itemsPerPage)
);

const paginatedProducts = computed(() =>
    filteredProducts.value.slice(
        (currentPage.value - 1) * itemsPerPage,
        currentPage.value * itemsPerPage
    )
);

// Reset page when filters change
watch(selectedCategories, () => {
    currentPage.value = 1;
});

</script>