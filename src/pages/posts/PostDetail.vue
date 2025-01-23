<template>
    <div>
        <PostItem :post="post" />
    </div>
</template>

<script>
import PostItem from '@/components/posts/PostItem.vue';  // Import component PostItem

export default {
    components: {
        PostItem
    },
    data() {
        return {
            post: {
                title: '',
                content: '',
            },
        };
    },
    created() {
        const postId = this.$route.params.id;  // Lấy id từ URL
        this.loadPost(postId);  // Gọi phương thức để tải bài viết theo id
    },
    methods: {
        loadPost(id) {
            // Giả sử gọi API để lấy thông tin bài viết theo id
            // Thay bằng API thực tế của bạn
            this.post = {
                title: `Bài viết ${id}`,
                content: `Nội dung chi tiết của bài viết ${id}`,
            };
        },
    },
}
</script>