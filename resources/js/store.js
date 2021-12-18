import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        posts: []
    },
    getters: {},
    mutations: {
        setPosts: (state, data) => {
            state.posts = data
        },
    },
    actions: {
        getPosts: async (context) => {
            await axios
                .post('/api/posts')
                .then(response => context.commit('setPosts', response.data))
        },
        addPost: async (context, data) => {
            await axios
                .post('/api/posts/create', data)
        },
        deletePost: async (context, id) => {
            await axios
                .post(`/api/posts/delete`, {id})
        }
    },
});


