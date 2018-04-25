import { EDIT_TYPE, EDIT_LINE_TYPE, EDIT_MAX_LENGTH } from './mutation-types';

export function editType({ commit }, newValue) {
    commit(EDIT_TYPE, newValue);
}

export function editLineType({ commit }, newValue) {
    commit(EDIT_LINE_TYPE, newValue);
}

export function editMaxLength({ commit }, newValue) {
    commit(EDIT_MAX_LENGTH, newValue);
}

