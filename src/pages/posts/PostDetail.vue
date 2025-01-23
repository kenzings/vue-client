<template>
    <div class="bg-gray-100 min-h-screen py-10">
        <!-- Post Detail -->
        <PostItem v-if="post" :post="post" />
        <div v-else class="text-center text-gray-500 text-xl">
            <p>Loading...</p>
        </div>

        <!-- Other Posts -->
        <div v-if="otherPosts.length > 0" class="mt-12">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
                Other Posts You Might Like
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <PostItem v-for="otherPost in otherPosts" :key="otherPost.id" :post="otherPost" />
            </div>
        </div>
    </div>
</template>

<script>
import PostItem from '@/components/posts/PostItem.vue'; // Import component PostItem
import PostsData from '@/data/posts.json'; // Import dữ liệu từ posts.json

export default {
    components: {
        PostItem,
    },
    data() {
        return {
            post: null, // Bài viết đang xem
            otherPosts: [], // Các bài viết khác
        };
    },
    created() {
        const postId = Number(this.$route.params.id); // Lấy id từ URL và chuyển thành số
        this.loadPost(postId); // Gọi phương thức để tải bài viết theo id
    },
    methods: {
        loadPost(id) {
            // Lọc bài viết hiện tại từ dữ liệu JSON
            const foundPost = PostsData.posts.find(post => post.id === id);

            if (foundPost) {
                this.post = foundPost; // Gán bài viết nếu tìm thấy
                this.loadOtherPosts(id); // Lọc các bài viết khác
            } else {
                this.$router.push({ name: 'NotFound' }); // Điều hướng nếu không tìm thấy bài viết
            }
        },

        loadOtherPosts(currentPostId) {
            // Lọc các bài viết khác ngoài bài hiện tại
            this.otherPosts = PostsData.posts.filter(post => post.id !== currentPostId);
        },
    },
};
</script>
<style scoped>
/* Chỉnh lề padding cho bài viết chính */
.PostItem {
    padding: 1rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}

.PostItem:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}
</style>