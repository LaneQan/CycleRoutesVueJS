import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import Carousel3d from 'vue-carousel-3d';
import SocialSharing from 'vue-social-sharing';
import VeeValidate, { Validator } from 'vee-validate';
import axios from 'axios';


import App from './App';
import router from './router';
import store from './store';
import ru from 'vee-validate/dist/locale/ru';
import AuthService from '@/services/AuthService';

import 'vuetify/dist/vuetify.min.css';
import './assets/styles.css';
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

Vue.config.productionTip = false;


Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(Carousel3d);
Vue.use(SocialSharing);
Vue.use(VeeValidate);

Validator.localize('ru', ru);

Vue.use(Vuetify, {
    theme: {
        primary: '#3f51b5',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c'
    }
});

axios.interceptors.request.use((config) => {
    if (!config.url.match(/operation\/login/i)) {
        config = {
            ...config,
            headers: {
                'Authorization': AuthService.getAuthToken()
            }
        };
    }
    return config;
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
                    text: 'Равнинный',
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
