import Vue from 'vue';
import Vuex from 'vuex';
import routes from './modules/routes';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    routes
  }
});
