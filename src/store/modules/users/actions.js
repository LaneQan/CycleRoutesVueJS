import axios from 'axios';
import apiConfig from '@apiConfig';
import {
    LOG_IN,
    LOG_OUT,
    FETCH_INFO,
    SET_UPLOADING_PHOTO
} from './mutation-types';

export function logIn({
    commit
}, creds) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${apiConfig.api}/api/operation/login`, creds)
            .then(response => {
                commit(LOG_IN, response.data);
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function signUp({
    commit
}, creds) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${apiConfig.api}/api/operation/register`, creds)
            .then(response => {
                commit(LOG_IN, response.data);
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function logOut({
    commit
}) {
    commit(LOG_OUT);
}

export function fetchInfo({
    commit
}, userId) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${apiConfig.api}/api/users/${userId}`)
            .then(response => {
                commit(FETCH_INFO, response.data);
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function setUploadingPhoto({
    commit
}, photo) {
    commit(SET_UPLOADING_PHOTO, photo);
}

export function uploadImage({
    commit
}, form) {
    return new Promise((resolve, reject) => {
        axios.post(`${apiConfig.api}/api/users/upload`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            resolve();
        }).catch(err => {
            console.log(err);
            reject(err);
        });
    });
};

export function deleteImage({
    commit
}, userId) {
    return new Promise((resolve, reject) => {
        axios.get(`${apiConfig.api}/api/users/delete/${userId}`).then(() => {
            resolve();
        }).catch(err => {
            console.log(err);
            reject(err);
        });
    });
};