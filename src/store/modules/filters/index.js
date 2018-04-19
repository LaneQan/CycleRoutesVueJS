import * as getters from './getters';

import {
    FILTER_EDIT_MIN_LENGTH,
    FILTER_EDIT_MAX_LENGTH,
    FILTER_EDIT_COMPLEXITY,
    FILTER_EDIT_LINE_TYPE,
    FILTER_EDIT_TYPE,
} from './mutation-types';

const initialState = {
    filters: {
        minLength: 0,
        maxLength: null,
        complexity: null,
        type: null,
        lineType: null,
    },
};

const mutations = {
    [FILTER_EDIT_MIN_LENGTH](state, value) {
        state.filters = {
            ...state.filters,
            minLength: value,
        };
    },
    [FILTER_EDIT_MAX_LENGTH](state, value) {
        state.filters = {
            ...state.filters,
            maxLength: value,
        };
    }
};

export default {
    state: {
        ...initialState,
    },
    getters,
    mutations,
};
