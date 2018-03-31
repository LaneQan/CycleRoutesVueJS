import axios from 'axios';
import apiConfig from '@apiConfig';
import { FETCH_ROUTES } from './mutation-types';

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
