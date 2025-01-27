<template>
    <div class="bg-gray-100 min-h-screen">
        <!-- Banner -->
        <div class="relative bg-cover bg-center h-64 flex items-center justify-center text-white"
            style="background-image: url('/bg/bg-pro-2.jpg');">
            <h1 class="text-4xl text-green-600 font-bold uppercase font-greatVibes">Products</h1>
        </div>

        <!-- Main Content -->
        <div class="container mx-auto px-4 py-8 grid grid-cols-12 gap-8">
            <!-- Sidebar Filters (Hidden on mobile) -->
            <aside class="hidden lg:block col-span-3 bg-white rounded-lg shadow p-4">
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

            <!-- Mobile Filter Trigger -->
            <div class="lg:hidden bg-indigo-600 text-white px-12 py-2 rounded-lg shadow mb-4 flex items-center justify-center cursor-pointer"
                @click="showFilters = true">
                Filter
            </div>


            <!-- Product List -->
            <section class="col-span-12 lg:col-span-9 bg-white rounded-lg shadow p-4">
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
                    <PostCard v-for="post in posts" :key="post.id" :post="post" />
                </div>
            </div>
        </div>

        <!-- Mobile Filter Modal -->
        <div v-if="showFilters" class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
                <h2 class="text-lg font-semibold mb-4">Filters</h2>
                <div>
                    <ul class="space-y-2">
                        <li v-for="category in categories" :key="category.id">
                            <label class="inline-flex items-center">
                                <input type="checkbox" class="form-checkbox h-5 w-5 text-indigo-600"
                                    :value="category.name" v-model="tempSelectedCategories" />
                                <span class="ml-2 text-gray-700">{{ category.name }}</span>
                            </label>
                        </li>
                    </ul>
                </div>
                <div class="mt-4 flex justify-between">
                    <!-- Close: Không áp dụng thay đổi -->
                    <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded" @click="showFilters = false">
                        Close
                    </button>

                    <!-- Apply: Áp dụng bộ lọc -->
                    <button class="bg-indigo-600 text-white px-4 py-2 rounded" @click="applyFilters">
                        Apply
                    </button>
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

const products = ref<Product[]>([]);
const posts = ref<Post[]>([]);
const categories = ref<Categories[]>([]);
const selectedCategories = ref<string[]>([]);
const showFilters = ref(false); // State for showing/hiding the modal
const tempSelectedCategories = ref<string[]>([]);

watch(showFilters, (newValue) => {
    if (newValue) {
        // Khi mở modal, sao chép giá trị từ selectedCategories
        tempSelectedCategories.value = [...selectedCategories.value];
    }
});


onMounted(() => {
    products.value = productsData.products;
    posts.value = postsData.posts;
    categories.value = categoriesData.categories;
});

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
const itemsPerPage = 12;

const totalPages = computed(() =>
    Math.ceil(filteredProducts.value.length / itemsPerPage)
);

const paginatedProducts = computed(() =>
    filteredProducts.value.slice(
        (currentPage.value - 1) * itemsPerPage,
        currentPage.value * itemsPerPage
    )
);

const applyFilters = () => {
  // Gán giá trị từ biến tạm vào selectedCategories
  selectedCategories.value = [...tempSelectedCategories.value];
  showFilters.value = false; // Đóng modal
};

watch(selectedCategories, () => {
    currentPage.value = 1;
});
</script>
<style scoped>
/* Center the modal */
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Modal background */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 50;
}
</style>