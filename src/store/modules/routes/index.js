import * as actions from './actions';
import * as getters from './getters';

import {
    FETCH_ROUTES,
    FETCH_ROUTE,
    FETCH_USER_ROUTES,
    LIKE_ROUTE,
    FETCH_FAVOURITE_ROUTES,
    DELETE_ROUTE
} from './mutation-types';

const initialState = {
    routes: [],
    currentRoute: null,
};

const mutations = {
    [FETCH_ROUTES](state, routes) {
        state.routes = [...routes];
    },
    [FETCH_ROUTE](state, route) {
        state.currentRoute = { ...route
        };
    },
    [FETCH_USER_ROUTES](state, routes) {
        state.routes = [...routes];
    },
    [LIKE_ROUTE](state, payload) {
        if (payload.likeType === 1) {
            state.currentRoute.isLiked ? state.currentRoute.likesCount-- : state.currentRoute.likesCount++;
            state.currentRoute.isLiked = !state.currentRoute.isLiked;
        } else {
            let route = state.routes.find(x => x.id === payload.routeId)
            route.isLiked ? route.likesCount-- : route.likesCount++;
            route.isLiked = !route.isLiked;
        }
    },
    [FETCH_FAVOURITE_ROUTES](state, routes) {
        state.routes = [...routes];
    },
    [DELETE_ROUTE](state, routeId) {
        const routeIndex = state.routes.findIndex(item => item.id === routeId);
        state.routes.splice(routeIndex, 1);
    }
};

export default {
    state: {
        ...initialState,
    },
    actions,
    getters,
    mutations,
};