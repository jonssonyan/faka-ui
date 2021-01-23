import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        Authorization: ""
    },
    mutations: {
        setAuthorization(state, token) {
            state.Authorization = token
        },
        getAuthorization(state) {
            return state.Authorization
        }
    }
});

export default store;
