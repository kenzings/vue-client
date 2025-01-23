<template>
    <div v-if="product" id="app" class="min-h-screen bg-gray-100 p-10">
        <div class="max-w-7xl mx-auto bg-white p-10 rounded-lg shadow-lg">
            <div class="flex flex-col lg:flex-row gap-10">
                <div class="lg:w-1/2">
                    <img src="https://placehold.co/800x600"
                        alt="Detailed view of the product showing its features and design"
                        class="rounded-lg w-full shadow-md">
                </div>
                <div class="lg:w-1/2">
                    <h1 class="text-4xl font-extrabold mb-6">{{ product.name }}</h1>
                    <p class="text-2xl text-gray-700 font-semibold mb-6">{{ product.price }}</p>
                    <p class="text-lg text-gray-600 mb-8 leading-relaxed">{{ product.description }}</p>
                    <div class="flex items-center mb-6">
                        <span class="text-yellow-500 mr-3">
                            <i class="fas fa-star" v-for="n in Math.floor(product.rating)" :key="n"></i>
                            <i class="fas fa-star-half-alt" v-if="product.rating % 1 !== 0"></i>
                        </span>
                        <span class="text-gray-600 text-lg">{{ product.rating }} ({{ product.reviews }} reviews)</span>
                    </div>
                    <button class="bg-blue-600 text-white px-6 py-3 text-lg rounded-lg hover:bg-blue-700 transition">
                        Add to Cart
                    </button>
                </div>
            </div>
            <div class="mt-12">
                <h2 class="text-3xl font-bold mb-6">Related Products</h2>
                <div class="relative">
                    <div ref="scrollContainer" class="flex overflow-x-auto hide-scroll-bar gap-6 pb-4">
                        <div v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" class="shrink-0">
                            <div class="bg-white p-6 rounded-lg shadow-md w-80">
                                <img :src="relatedProduct.image" :alt="relatedProduct.alt"
                                    class="rounded-lg w-full mb-4 shadow-sm">
                                <h3 class="text-xl font-bold mb-3">{{ relatedProduct.name }}</h3>
                                <p class="text-lg text-gray-700 mb-4">{{ relatedProduct.price }}</p>
                                <button
                                    class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                    <button @click="scrollLeft"
                        class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md focus:outline-none">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button @click="scrollRight"
                        class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md focus:outline-none">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import productsData from '@/data/products.json';

const route = useRoute();
const router = useRouter();
const scrollContainer = ref<HTMLDivElement | null>(null);
const autoScrollInterval = ref<ReturnType<typeof setInterval> | null>(null);

// Extract and parse ID from route
const productId = Number(route.params.id);

// Find product by ID
const product = ref(productsData.products.find((p) => p.id === productId) || null);

const relatedProducts = ref([
    { id: 1, name: 'Related Product 1', price: '$49.99', image: 'https://placehold.co/300x200', alt: 'Image of Related Product 1' },
    { id: 2, name: 'Related Product 2', price: '$59.99', image: 'https://placehold.co/300x200', alt: 'Image of Related Product 2' },
    { id: 3, name: 'Related Product 3', price: '$69.99', image: 'https://placehold.co/300x200', alt: 'Image of Related Product 3' },
    { id: 4, name: 'Related Product 4', price: '$79.99', image: 'https://placehold.co/300x200', alt: 'Image of Related Product 4' },
    { id: 5, name: 'Related Product 5', price: '$89.99', image: 'https://placehold.co/300x200', alt: 'Image of Related Product 5' },
    { id: 6, name: 'Related Product 6', price: '$99.99', image: 'https://placehold.co/300x200', alt: 'Image of Related Product 6' }
]);

const scrollLeft = () => {
    scrollContainer.value?.scrollBy({
        left: -300,
        behavior: 'smooth',
    });
};

const scrollRight = () => {
    scrollContainer.value?.scrollBy({
        left: 300,
        behavior: 'smooth',
    });
};

const startAutoScroll = () => {
    if (!scrollContainer.value) return;
    autoScrollInterval.value = setInterval(() => {
        if (!scrollContainer.value) return;

        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;

        if (scrollLeft + clientWidth >= scrollWidth) {
            // Scroll to the start
            scrollContainer.value.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            // Scroll further
            scrollContainer.value.scrollBy({ left: 300, behavior: 'smooth' });
        }
    }, 3000); // Auto-scroll every 3 seconds
};

const stopAutoScroll = () => {
    if (autoScrollInterval.value) {
        clearInterval(autoScrollInterval.value);
        autoScrollInterval.value = null;
    }
};

onMounted(() => {
    if (!product.value) {
        router.push({ name: 'NotFound' });
        return;
    }

    startAutoScroll();

    // Pause auto-scroll on user interaction
    scrollContainer.value?.addEventListener('mouseenter', stopAutoScroll);
    scrollContainer.value?.addEventListener('mouseleave', startAutoScroll);
});

onBeforeUnmount(() => {
    stopAutoScroll();

    // Remove event listeners
    scrollContainer.value?.removeEventListener('mouseenter', stopAutoScroll);
    scrollContainer.value?.removeEventListener('mouseleave', startAutoScroll);
});

// const addToCart = () => {
//     alert('Product added to cart!');
// };

// const viewProduct = (id: number) => {
//     alert(`View details of product ${id}`);
// };
</script>


<style scoped>
/* Ẩn thanh cuộn cho phần slider */
.hide-scroll-bar::-webkit-scrollbar {
    display: none;
}

.hide-scroll-bar {
    -ms-overflow-style: none;
    /* Internet Explorer 10+ */
    scrollbar-width: none;
    /* Firefox */
}

/* Khoảng cách và canh chỉnh cho các button */
button {
    font-size: 1rem;
}

@media (min-width: 1024px) {
    #app {
        padding: 4rem;
    }

    .shadow-md {
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
}
</style>
