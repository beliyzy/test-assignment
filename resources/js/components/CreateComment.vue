<template>
    <div class="create-comment">
        <p class="lead">
            Добавить комментарий
        </p>
        <form @submit.prevent="checkForm">
            <div class="mb-3">
                <label for="username" class="form-label">Имя</label>
                <input
                    type="text"
                    class="form-control"
                    id="username"
                    placeholder="Введите ваше имя"
                    v-model.trim="form.name"
                    :class="$v.form.name.$error ? 'is-invalid' : ''"
                >
                <p v-if="$v.form.name.$dirty && !$v.form.name.required" class="invalid-feedback">
                    Обязательное поле
                </p>
                <p v-if="$v.form.name.$dirty && !$v.form.name.minLength" class="invalid-feedback">
                    Здесь должно быть как минимум 3 символа
                </p>
                <p v-if="$v.form.name.$dirty && !$v.form.name.maxLength" class="invalid-feedback">
                    Здесь должно быть не больше 15 символов
                </p>
            </div>
            <div class="mb-3">
                <label for="text" class="form-label">Комментарий</label>
                <textarea
                    class="form-control"
                    id="text"
                    rows="3"
                    v-model.trim="form.text"
                    :class="$v.form.text.$error ? 'is-invalid' : ''"
                />
                <p v-if="$v.form.text.$dirty && !$v.form.text.required" class="invalid-feedback">
                    Обязательное поле
                </p>
                <p v-if="$v.form.text.$dirty && !$v.form.text.minLength" class="invalid-feedback">
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
    name: "CreateComment",
    mixins: [validationMixin],
    data() {
        return {
            form: {
                name: '',
                text: '',
                post_id: this.$route.params.id
            }
        }
    },
    methods: {
        checkForm() {
            this.$v.form.$touch()
            if (!this.$v.form.$error) {
                this.addComment(this.form.name, this.form.text, this.form.post_id)
            }
        },
        addComment(name, text, post_id) {
            this.$emit('add-comment', {name, text, post_id})
            this.form.name = ''
            this.form.text = ''
        }
    },
    validations: {
        form: {
            name: {required, minLength: minLength(3), maxLength: maxLength(15) },
            text: {required, minLength: minLength(5)}
        }
    }
}
</script>

<style lang="scss">

</style>
