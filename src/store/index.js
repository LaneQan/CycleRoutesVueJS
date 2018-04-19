import Vue from 'vue';
import Vuex from 'vuex';
import routes from './modules/routes';
import users from './modules/users';
import filters from './modules/filters';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        users,
        routes,
        filters,
    },
});
