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
            await this.getPosts()
        },
        async addNewPost({title, description}) {
            await this.addPost({
                title: title,
                description: description
            })
            await this.getPosts()
        }
    },
    created() {
        this.getPosts();
        // this.addPost({
        //     title: 'Fourth Post',
        //     description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis deleniti laborum libero! Alias aliquid, debitis deleniti earum enim error excepturi harum iste modi optio perspiciatis quibusdam, recusandae, rerum ullam.'
        // })
    },
    computed: {
        ...mapState(['posts']),
    },
    watch: {
        posts() {
            console.log('WATCH')
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
    }

    .card-body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
}

.post-description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
}

</style>
