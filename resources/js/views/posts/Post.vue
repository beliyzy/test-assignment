<template>
    <div>
        <div class="alert alert-info">
            <h1 class="display-4">{{ post.title }}</h1>
            <p class="lead">{{ post.description }}</p>
            <div class="comments"></div>
        </div>
        <div class="comments">
            <div
                class="card"
                style="width: 18rem;"
                v-for="comment in comments.slice(currentPage*3, currentPage*3+3)"
            >
                <div class="card-body">
                    <div class="card-info">
                        <h5 class="card-title">{{ comment.name }}</h5>
                        <p class="card-text post-description">{{ comment.text }}</p>
                    </div>
                    <div class="card-buttons">
                        <button
                            type="button"
                            @click="removeComment(comment.id)"
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
                <a class="page-link" href="#">
                    Previous
                </a>
            </li>
            <li
                class="page-item"
                v-for="(page, index) in lastPage"
                @click="currentPage = index">
                <a
                    class="page-link"
                    :class="currentPage === index ? 'active-page' : ''"
                    href="#">
                    {{ page }}
                </a>
            </li>
            <li
                class="page-item"
                @click="currentPage !==lastPage-1 ? currentPage++ : ''">
                <a class="page-link" href="#">
                    Next
                </a>
            </li>
        </ul>
        <CreateComment @add-comment="addNewComment"/>
    </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from "vuex";
import CreateComment from "../../components/CreateComment";

export default {
    name: "Post",
    components: {CreateComment},
    props: ['id'],
    data() {
        return {
            currentPage: 0,
            lastPage: 0
        }
    },
    methods: {
        ...mapActions(['getPost', 'getComments', 'addComment', 'deleteComment']),
        async removeComment(id) {
            await this.deleteComment(id)
        },
        async addNewComment({name, text, post_id}) {
            await this.addComment({
                name: name,
                text: text,
                post_id: post_id
            })
        }
    },
    created() {
        this.getPost(this.id);
        this.getComments(this.id)
    },
    computed: {
        ...mapState(['post', 'comments']),
    },
    watch: {
        comments() {
            this.getComments(this.id)
            this.lastPage = Math.ceil(this.comments.length / 3)
        }
    }
}
</script>

<style lang="scss">
.comments {
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

</style>
