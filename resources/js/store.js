import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        posts: [],
        post: {},
        comments: []
    },
    getters: {},
    mutations: {
        setPosts: (state, data) => {
            state.posts = data
        },
        setPost: (state, data) => {
            state.post = data
        },
        setComments: (state, data) => {
            state.comments = data
        }
    },
    actions: {
        getPosts: async (context) => {
            await axios
                .post('/api/posts')
                .then(response => context.commit('setPosts', response.data))
        },
        getPost: async (context, id) => {
            await axios
                .post('/api/post', {id})
                .then(response => context.commit('setPost', response.data))
        },
        addPost: async (context, data) => {
            await axios
                .post('/api/posts/create', data)
                .then(response => context.commit('setPosts', response.data))
        },
        deletePost: async (context, id) => {
            await axios
                .post(`/api/posts/delete`, {id})
                .then(response => context.commit('setPosts', response.data))
        },

        addComment: async (context, data) => {
            await axios
                .post('/api/comments/create', data)
                .then(response => context.commit('setComments', response.data))
        },
        getComments: async (context, id) => {
            await axios
                .post('/api/post', {id})
                .then(response => context.commit('setComments', response.data.comments))
        },
        deleteComment: async (context, id) => {
            await axios
                .post(`/api/comments/delete`, {id})
                .then(response => context.commit('setComments', response.data))
        },
    },
});


