<template>
    <div>
        <div class="alert alert-info">
            <p class="lead">
                Вот тут мы хотим увидеть список всех постов!
            </p>
            <div class="posts">
                <div class="card" style="width: 18rem;" v-for="post in posts">
                    <div class="card-body">
                        <div class="card-info">
                            <h5 class="card-title">{{ post.title }}</h5>
                            <p class="card-text post-description">{{ post.description }}</p>
                        </div>
                        <div class="card-buttons">
                            <router-link
                                :to="{ name: 'Post', params: { id: post.id }}">
                                Открыть
                            </router-link>
                            <button
                                type="button"
                                @click="removePost(post.id)"
                                class="btn btn-danger btn-sm">
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <CreatePost @add-post="addNewPost"/>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex';
import Post from "./Post";
import CreatePost from "../../components/CreatePost";

export default {
    name: "Posts",
    components: {
        Post,
        CreatePost
    },
    methods: {
        ...mapActions(['getPosts', 'addPost', 'deletePost']),
        async removePost(id) {
            await this.deletePost(id)
        },
        async addNewPost({title, description}) {
            await this.addPost({
                title: title,
                description: description
            })
        }
    },
    created() {
        this.getPosts();
    },
    computed: {
        ...mapState(['posts']),
    },
    watch: {
        posts() {
            this.getPosts()
        }
    }
}
</script>

<style lang="scss">

.posts {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;

    .card-buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    .card-body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .card-title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
    .card-text {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
    }
}



</style>
