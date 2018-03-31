import Vue from 'vue';
import Router from 'vue-router';
import RoutesList from '@/components/pages/RoutesList';
import Login from '@/components/pages/Login';
import Signup from '@/components/pages/Signup';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/routes',
            name: 'RoutesList',
            component: RoutesList
        },
        {
            path: '/',
            redirect: '/routes'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup
        }
    ]
});

function authRequired(to, from, next) {
    if (AuthService.isUserAuthenticated()) {
        next();
    } else {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        });
    }
}