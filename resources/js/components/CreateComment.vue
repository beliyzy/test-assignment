<template>
    <div class="create-comment">
        <p class="lead">
            Добавить комментарий
        </p>
        <form @submit.prevent="addComment(name, text, post_id)">
            <div class="mb-3">
                <label for="username" class="form-label">Имя</label>
                <input
                    type="text"
                    class="form-control"
                    id="username"
                    placeholder="Введите ваше имя"
                    required
                    v-model.trim="name"
                >
            </div>
            <div class="mb-3">
                <label for="text" class="form-label">Комментарий</label>
                <textarea
                    class="form-control"
                    id="text"
                    rows="3"
                    required
                    v-model.trim="text"
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
    name: "CreateComment",
    data() {
        return {
            name: '',
            text: '',
            post_id: this.$route.params.id
        }
    },
    methods: {
        addComment(name, text, post_id) {
            this.$emit('add-comment', { name, text, post_id })
            this.name = ''
            this.text = ''
        }
    }
}
</script>

<style lang="scss">

</style>
