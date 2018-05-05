import {
    EDIT_MAX_LENGTH,
    CLEAR_FILTERS
} from './mutation-types';

export function editMaxLength({
    commit
}, newValue) {
    commit(EDIT_MAX_LENGTH, newValue);
}

export function clearFilters({
    commit
}) {
    commit(CLEAR_FILTERS);
}