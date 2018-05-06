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
            routeTypes: [{
                text: 'Все',
                value: -1
            }, {
                text: 'Городской',
                value: 0
            }, {
                text: 'Загородный',
                value: 1
            }, {
                text: 'Смешанный',
                value: 2
            }],

            routeLineTypes: [{
                text: 'Все',
                value: -1
            }, {
                text: 'Круговой',
                value: 0
            }, {
                text: 'Прямой',
                value: 1
            }, ],

            routeLandscapes: [{
                    text: 'Все',
                    value: -1
                },
                {
                    text: 'Гладкий',
                    value: 0
                },
                {
                    text: 'Холмистый',
                    value: 1
                },
                {
                    text: 'Горный',
                    value: 2
                },
                {
                    text: 'Смешанный',
                    value: 3
                },
            ],
            lengthTimes: [{
                    text: 'Все',
                    value: -1
                },
                {
                    text: 'Менее 6 часов',
                    value: 0
                },
                {
                    text: 'Дневной',
                    value: 1
                },
                {
                    text: 'Два дня с ночевкой',
                    value: 2
                },
                {
                    text: 'Больше двух дней',
                    value: 3
                }
            ]
        };
    }
});

new Vue({
    el: '#app',
    store,
    router,
    components: {
        App
    },
    template: '<App/>'
});