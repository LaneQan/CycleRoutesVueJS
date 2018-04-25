import * as actions from './actions';
import * as getters from './getters';

import { FETCH_ROUTES, FETCH_ROUTE, FETCH_USER_ROUTES } from './mutation-types';

const initialState = {
    routes: [],
    currentRoute: null,
};

const mutations = {
    [FETCH_ROUTES](state, routes) {
        state.routes = [...routes];
    },
    [FETCH_ROUTE](state, route) {
        state.currentRoute = { ...route };
    },
    [FETCH_USER_ROUTES](state, routes) {
        state.routes = [...routes];
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
