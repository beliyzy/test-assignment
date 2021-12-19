<template>
    <div>
        <div class="alert alert-info">
            <p class="lead">
                Вот тут мы хотим увидеть список всех постов!
            </p>
            <div class="posts">
                <div class="card" style="width: 18rem;" v-for="post in posts.slice(currentPage*3, currentPage*3+3)">
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
                <ul class="pagination">
                    <li
                        class="page-item"
                        @click="currentPage !==0 ? currentPage-- : ''">
                        <a
                            class="page-link"
                            href="#">
                            Previous
                        </a>
                    </li>
                    <li
                        class="page-item"
                        v-for="(page, index) in lastPage"
                        @click="currentPage = index"
                    >
                        <a
                            class="page-link"
                            href="#"
                            :class="currentPage === index ? 'active-page' : ''"
                        >{{  page  }} </a>
                    </li>
                    <li class="page-item"
                        @click="currentPage !==lastPage-1 ? currentPage++ : ''">
                        <a class="page-link" href="#">Next</a>
                    </li>
                </ul>
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
    data () {
        return {
            currentPage: 0,
            lastPage: 0,
        }
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
            this.lastPage = Math.ceil(this.posts.length / 3)
        }
    }
}
</script>

<style lang="scss">

.posts {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 75px;

    .card {
        height: 220px;
    }

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

.pagination {
    justify-content: center;
    margin-top: 30px;
}

.active-page {
    background-color: #3f9ae5;
    color: #fff;
}
</style>
