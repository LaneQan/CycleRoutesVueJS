import * as actions from './actions';
import * as getters from './getters';

import { FETCH_ROUTES, FETCH_ROUTE } from './mutation-types';

const initialState = {
    routes: [],
    currentRoute: null
};

const mutations = {
    [FETCH_ROUTES](state, routes) {
        state.routes = [...routes];
    },
    [FETCH_ROUTE](state, route)  {
        state.currentRoute = route;
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
