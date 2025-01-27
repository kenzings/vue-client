<template>
    <div v-if="product" id="app" class="min-h-screen bg-gray-100 p-6">
        <div class="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <!-- Product Detail Section -->
            <div class="flex flex-col lg:flex-row gap-10">
                <div class="lg:w-1/2">
                    <img :src="product.image" :alt="`Detailed view of ${product.name}`"
                        class="rounded-lg w-full shadow-md">
                </div>
                <div class="lg:w-1/2">
                    <h1 class="text-4xl font-extrabold mb-6">{{ product.name }}</h1>
                    <p class="text-2xl text-gray-700 font-semibold mb-6">$ {{ product.price }}</p>
                    <p class="text-lg text-gray-600 mb-8 leading-relaxed">{{ product.description }}</p>
                    <div class="flex items-center mb-6">
                        <span class="flex text-yellow-500 mr-3">
                            <i class="fas fa-star" v-for="n in Math.floor(product.rating ?? 0)"
                                :key="'filled-' + n"></i>
                            <i class="fas fa-star-half-alt" v-if="(product.rating ?? 0) % 1 !== 0"></i>
                            <i class="fas fa-star text-gray-400" v-for="n in (5 - Math.ceil(product.rating ?? 0))"
                                :key="'empty-' + n"></i>
                        </span>
                        <span class="text-gray-600 text-lg">
                            {{ product.rating ?? "No rating" }} ({{ product.reviews ?? 0 }} reviews)
                        </span>
                    </div>
                    <button class="bg-blue-600 text-white px-6 py-3 text-lg rounded-lg hover:bg-blue-700 transition">
                        Add to Cart
                    </button>
                </div>
            </div>

            <!-- Related Products Section -->
            <div class="mt-12">
                <h2 class="text-3xl font-bold mb-6">Related Products</h2>
                <div v-if="relatedProducts.length" class="relative" @mouseenter="pauseScroll"
                    @mouseleave="resumeScroll">
                    <div ref="scrollContainer"
                        class="flex overflow-x-auto snap-x snap-mandatory hide-scroll-bar gap-6 pb-4">
                        <div v-for="relatedProduct in relatedProducts" :key="relatedProduct.id"
                            class="shrink-0 snap-start w-72">
                            <div class="bg-white rounded-lg shadow-md h-full">
                                <img :src="relatedProduct.image" :alt="relatedProduct.name"
                                    class="rounded-lg w-full mb-4 shadow-sm">
                                <div class="p-4">
                                    <h3 class="text-xl font-bold mb-3">{{ relatedProduct.name }}</h3>
                                    <p class="text-lg text-gray-700 mb-4">$ {{ relatedProduct.price }}</p>
                                    <button @click="viewProduct(relatedProduct.id)"
                                        class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button @click="scrollLeft" v-if="canScrollLeft"
                        class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md focus:outline-none hover:bg-gray-700">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button @click="scrollRight" v-if="canScrollRight"
                        class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md focus:outline-none hover:bg-gray-700">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div v-else class="text-gray-500 text-lg">No related products available.</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import productsData from '@/data/products.json';
import type { Product } from '@/types/Product';

const route = useRoute();
const router = useRouter();
const scrollContainer = ref<HTMLDivElement | null>(null);
const autoScrollInterval = ref<ReturnType<typeof setInterval> | null>(null);
const isScrolling = ref(false);
const canScrollLeft = ref(false);
const canScrollRight = ref(false);

// Product data
const productId = Number(route.params.id);
const product = ref<Product | null>(
    productsData.products.find((p) => p.id === productId) || null
);
const relatedProducts = ref<Product[]>([]);

// Scroll handlers
const updateScrollButtons = () => {
    if (!scrollContainer.value) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
    canScrollLeft.value = scrollLeft > 0;
    canScrollRight.value = scrollLeft + clientWidth < scrollWidth;
};

const scrollLeft = () => {
    if (!scrollContainer.value) return;
    const cardWidth = 288; // 72rem (w-72)
    const gapWidth = 24; // 6 spacing units
    const scrollAmount = cardWidth + gapWidth;

    scrollContainer.value.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
    });
};

const scrollRight = () => {
    if (!scrollContainer.value) return;
    const cardWidth = 288; // 72rem (w-72)
    const gapWidth = 24; // 6 spacing units
    const scrollAmount = cardWidth + gapWidth;

    scrollContainer.value.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
    });
};

// Auto scroll functionality
const startAutoScroll = async () => {
    if (!scrollContainer.value || isScrolling.value) return;

    const { scrollWidth, clientWidth } = scrollContainer.value;
    if (scrollWidth <= clientWidth) return;

    isScrolling.value = true;
    autoScrollInterval.value = setInterval(() => {
        if (!scrollContainer.value) return;

        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
        const maxScroll = scrollWidth - clientWidth;

        if (scrollLeft >= maxScroll) {
            scrollContainer.value.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            scrollContainer.value.scrollBy({ left: 300, behavior: 'smooth' });
        }

        updateScrollButtons();
    }, 3000);
};

const stopAutoScroll = () => {
    if (autoScrollInterval.value) {
        clearInterval(autoScrollInterval.value);
        autoScrollInterval.value = null;
        isScrolling.value = false;
    }
};

const pauseScroll = () => {
    stopAutoScroll();
};

const resumeScroll = () => {
    startAutoScroll();
};

const viewProduct = (id: number) => {
    router.push({ name: 'ProductDetail', params: { id: id.toString() } });
};

// Lifecycle hooks
onMounted(async () => {
    if (!product.value) {
        router.push({ name: 'NotFound' });
        return;
    }

    relatedProducts.value = productsData.products.filter(
        (p) => p.category === product.value?.category && p.id !== product.value?.id
    );

    await nextTick();

    if (relatedProducts.value.length > 0) {
        updateScrollButtons();
        startAutoScroll();

        if (scrollContainer.value) {
            scrollContainer.value.addEventListener('scroll', updateScrollButtons);
        }
    }
});

onBeforeUnmount(() => {
    stopAutoScroll();
    if (scrollContainer.value) {
        scrollContainer.value.removeEventListener('scroll', updateScrollButtons);
    }
});
</script>

<style scoped>
.hide-scroll-bar::-webkit-scrollbar {
    display: none;
}

.hide-scroll-bar {
    -ms-overflow-style: none;
    scrollbar-width: none;
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