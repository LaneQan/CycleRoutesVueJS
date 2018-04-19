import * as actions from './actions';
import * as getters from './getters';

import { FETCH_ROUTES } from './mutation-types';

const initialState = {
    routes: [],
};

const mutations = {
    [FETCH_ROUTES](state, routes) {
        state.routes = [...routes];
    },
};

export default {
    state: {
        ...initialState,
    },
    actions,
    getters,
    mutations,
};
