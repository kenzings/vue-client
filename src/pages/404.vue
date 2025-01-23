<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div class="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 text-center">
            <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p class="text-2xl text-gray-600 mb-8">Product Not Found</p>
            <p class="text-gray-500 mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <router-link 
                to="/" 
                class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
                Back to Home
            </router-link>
        </div>
    </div>
</template>