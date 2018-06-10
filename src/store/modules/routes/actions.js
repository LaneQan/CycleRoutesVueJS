import axios from 'axios';
import apiConfig from '@apiConfig';
import {
    FETCH_ROUTES,
    FETCH_ROUTE,
    FETCH_USER_ROUTES,
    LIKE_ROUTE,
    FETCH_FAVOURITE_ROUTES,
    DELETE_ROUTE
} from './mutation-types';

export function fetchRoutes({
    commit
}) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${apiConfig.api}/api/routes`)
            .then(res => {
                commit(FETCH_ROUTES, res.data);
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function fetchRoute({
    commit
}, id) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${apiConfig.api}/api/routes/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
            })
            .then(res => {
                commit(FETCH_ROUTE, res.data);
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function fetchUserRoutes({
    commit
}, userId) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${apiConfig.api}/api/routes/user/${userId}`)
            .then(res => {
                commit(FETCH_USER_ROUTES, res.data);
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function likeRoute({
    commit
}, payload) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${apiConfig.api}/api/routes/like/${payload.routeId}`)
            .then(res => {
                commit(LIKE_ROUTE, payload);
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function fetchFavouriteRoutes({
    commit
}, userId) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${apiConfig.api}/api/routes/favourite/${userId}`)
            .then(res => {
                commit(FETCH_FAVOURITE_ROUTES, res.data);
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function addRoute({
    commit
}, form) {
    return new Promise((resolve, reject) => {
        axios.post(`${apiConfig.api}/api/routes/add`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            resolve(res);
        }).catch(err => {
            console.log(err);
            reject(err);
        });
    });
};

export function deleteRoute({
    commit
}, route) {
    return new Promise((resolve, reject) => {
        axios.get(`${apiConfig.api}/api/routes/delete/${route.id}` ).then(() => {
            commit(DELETE_ROUTE, route.id);
            resolve();
        }).catch(err => {
            console.log(err);
            reject(err);
        });
    });
};