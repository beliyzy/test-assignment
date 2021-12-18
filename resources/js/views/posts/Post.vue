<template>
    <div>
        <div class="alert alert-info">
            <h1 class="display-4">{{  post.title }}</h1>
            <p class="lead">{{ post.description }}</p>
            <div class="comments"></div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "Post",
    props: ['id'],
    methods: {
        ...mapActions(['getPost'])
    },
    created() {
        this.getPost(this.id);
    },
    computed: {
        ...mapState(['post']),
    }
}
</script>

<style lang="scss">

</style>
