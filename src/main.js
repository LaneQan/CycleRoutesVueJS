import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

import App from './App';
import router from './router';
import store from './store';
import Carousel3d from 'vue-carousel-3d';

import 'vuetify/dist/vuetify.min.css';
import './assets/styles.css';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(Carousel3d);

Vue.use(Vuetify, {
    theme: {
        primary: '#3f51b5',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c'
    }
});

Vue.mixin({
    data() {
        return {
            routeTypes: ['Тип маршрута','Городской', 'Загородный', 'Смешанный'],
            routesLineTypes: ['Круговой', 'Прямой']
        };
    }
});

new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
});
