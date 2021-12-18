<template>
    <div class="create-post">
        <p class="lead">
            Добавить пост
        </p>
        <form @submit.prevent="addPost(title, description)">
            <div class="mb-3">
                <label for="title" class="form-label">Заголовок поста</label>
                <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="Введите заголовок поста"
                    required
                    v-model="title"
                >
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Описание поста</label>
                <textarea
                    class="form-control"
                    id="description"
                    rows="3"
                    required
                    v-model="description"
                ></textarea>
            </div>
            <button
                class="btn btn-primary"
                type="submit"
            >Отправить
            </button>
        </form>
    </div>
</template>

<script>
export default {
    name: "CreatePost.vue",
    data() {
        return {
            title: '',
            description: ''
        }
    },
    methods: {
        addPost(title, description) {
            this.$emit('add-post', { title, description })
            this.title = ''
            this.description = ''
        }
    }
}
</script>

<style lang="scss">
.create-post {
    margin-top: 50px;
}
</style>
