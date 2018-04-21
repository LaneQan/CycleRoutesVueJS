import axios from 'axios';
import apiConfig from '@apiConfig';
import { FETCH_ROUTES, FETCH_ROUTE } from './mutation-types';

export function fetchRoutes({ commit }) {
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

export function fetchRoute({ commit }, id) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${apiConfig.api}/api/routes/${id}`)
            .then(res => {
                commit(FETCH_ROUTE, res.data);
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}
