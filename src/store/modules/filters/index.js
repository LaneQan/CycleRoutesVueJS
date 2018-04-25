import * as actions from './actions';
import * as getters from './getters';

import { EDIT_LINE_TYPE, EDIT_TYPE, EDIT_MAX_LENGTH } from './mutation-types';

const initialState = {
    filters: {
        minLength: 0,
        maxLength: null,
        type: -1,
        lineType: -1,
    },
};

const mutations = {
    [EDIT_TYPE](state, value) {
        state.filters = {
            ...state.filters,
            type: value,
        };
    },
    [EDIT_LINE_TYPE](state, value) {
        state.filters = {
            ...state.filters,
            lineType: value,
        };
    },
    [EDIT_MAX_LENGTH](state, value) {
        state.filters = {
            ...state.filters,
            maxLength: value,
        };
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
