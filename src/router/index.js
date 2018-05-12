import Vue from 'vue';
import Router from 'vue-router';
import AuthService from '../services/AuthService';
import RoutesList from '@/components/pages/RoutesList';
import Login from '@/components/pages/Login';
import Signup from '@/components/pages/Signup';
import RouteInfo from '@/components/pages/RouteInfo';
import MyRoutes from '@/components/pages/MyRoutes';
import FavouriteRoutes from '@/components/pages/FavouriteRoutes';
import AddRoute from '@/components/pages/AddRoute';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/routes',
            name: 'RoutesList',
            component: RoutesList,
        },
        {
            path: '/',
            redirect: '/routes',
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup,
        },
        {
            path: '/routes/:id',
            name: 'RouteInfo',
            component: RouteInfo,
        },
        {
            path: '/my-routes',
            name: 'MyRoutes',
            component: MyRoutes,
            beforeEnter: authRequired,
        },
        {
            path: '/favourite-routes',
            name: 'FavouriteRoutes',
            component: FavouriteRoutes,
            beforeEnter: authRequired,
        },
        {
            path: '/add-route',
            name: 'AddRoute',
            component: AddRoute,
            beforeEnter: authRequired,
        }
    ],
});

function authRequired(to, from, next) {
    if (AuthService.isUserAuthenticated()) {
        next();
    } else {
        next({
            path: '/login',
            query: {
                redirect: to.fullPath
            },
        });
    }
}