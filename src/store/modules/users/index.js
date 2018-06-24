import * as actions from './actions';
import * as getters from './getters';
import AuthService from '../../../services/AuthService';
import router from '../../../router';

import {
    LOG_IN,
    LOG_OUT,
    FETCH_INFO,
    SET_UPLOADING_PHOTO,
    CHANGE_PHOTO,
    CHANGE_INFO,
    DELETE_PHOTO,
} from './mutation-types';

const initialState = {
    user: AuthService.isUserAuthenticated() ? AuthService.getPayload() : {},
    userInfo: {},
    uploadingPhoto: null,
};

const mutations = {
    [LOG_IN](state, token) {
        AuthService.authenticateUser(token);
        state.user = AuthService.getPayload();
        router.push('/');
    },

    [LOG_OUT](state) {
        AuthService.deauthenticateUser();
        state.user = {};
        location.reload();
    },
    [FETCH_INFO](state, userInfo) {
        state.userInfo = { ...userInfo
        };
    },
    [SET_UPLOADING_PHOTO](state, photo) {
        state.uploadingPhoto = photo;
    },
    [CHANGE_PHOTO](state, photoUrl) {
        state.userInfo.image = photoUrl;
    },
    [CHANGE_INFO](state, info) {
        state.userInfo.currentCity = info.CurrentCity;
        state.userInfo.phone = info.Phone;
        state.userInfo.about = info.About;
    },
    [DELETE_PHOTO](state) {
        state.userInfo.image = '';
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