import * as actions from './actions';
import * as getters from './getters';

import {
    FETCH_ROUTES,
    FETCH_ROUTE,
    FETCH_USER_ROUTES,
    LIKE_ROUTE
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
    [LIKE_ROUTE](state, routeId) {
        if (state.currentRoute) {
            state.currentRoute.likesCount = state.currentRoute.isLiked ? state.currentRoute.likesCount-- : state.currentRoute.likesCount++;
            state.currentRoute.isLiked = !state.currentRoute.isLiked;    
        } else {
            let route = state.routes.find(x => x.id === routeId)
            route.isLiked ? route.likesCount-- : route.likesCount++;
            route.isLiked = !route.isLiked;
        }
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