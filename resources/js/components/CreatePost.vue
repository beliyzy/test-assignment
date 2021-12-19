<template>
    <div class="create-post">
        <p class="lead">
            Добавить пост
        </p>
        <form @submit.prevent="checkForm">
            <div class="mb-3">
                <label for="title" class="form-label">Заголовок поста</label>
                <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="Введите заголовок поста"
                    v-model.trim="form.title"
                    :class="$v.form.title.$error ? 'is-invalid' : ''"
                >
                <p v-if="$v.form.title.$dirty && !$v.form.title.required" class="invalid-feedback">
                    Обязательное поле
                </p>
                <p v-if="$v.form.title.$dirty && !$v.form.title.minLength" class="invalid-feedback">
                    Здесь должно быть как минимум 3 символа
                </p>
                <p v-if="$v.form.title.$dirty && !$v.form.title.maxLength" class="invalid-feedback">
                    Здесь должно быть не больше 15 символов
                </p>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Описание поста</label>
                <textarea
                    class="form-control"
                    id="description"
                    rows="3"
                    v-model.trim="form.description"
                    :class="$v.form.description.$error ? 'is-invalid' : ''"
                />
                <p v-if="$v.form.description.$dirty && !$v.form.description.required" class="invalid-feedback">
                    Обязательное поле
                </p>
                <p v-if="$v.form.description.$dirty && !$v.form.description.minLength" class="invalid-feedback">
                    Здесь должно быть хотя бы 5 символов
                </p>
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
import {validationMixin} from 'vuelidate'
import {minLength, maxLength, required } from 'vuelidate/lib/validators'

export default {
    name: "CreatePost.vue",
    mixins: [validationMixin],
    data() {
        return {
            form: {
                title: '',
                description: ''
            }
        }
    },
    methods: {
        checkForm() {
            this.$v.form.$touch()
            if (!this.$v.form.$error) {
                this.addPost(this.form.title, this.form.description)
            }
        },
        addPost(title, description) {
            this.$emit('add-post', { title, description })
            this.form.title = ''
            this.form.description = ''
        }
    },
    validations: {
        form: {
            title: {required, minLength: minLength(3), maxLength: maxLength(15) },
            description: {required, minLength: minLength(5)}
        }
    }
}
</script>

<style lang="scss">
.create-post {
    margin-top: 50px;
}
</style>
