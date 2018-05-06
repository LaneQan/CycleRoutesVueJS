import * as actions from './actions';
import * as getters from './getters';

import {
    EDIT_MAX_LENGTH,
    CLEAR_FILTERS
} from './mutation-types';

const initialState = {
    filters: {
        minLength: 0,
        maxLength: null,
        type: -1,
        lineType: -1,
        landscape: -1,
        lengthTime: -1,
    },
};

const mutations = {
    [EDIT_MAX_LENGTH](state, value) {
        state.filters = {
            ...state.filters,
            maxLength: value,
        };
    },
    [CLEAR_FILTERS](state) {
        state.filters = {
            ...initialState.filters
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