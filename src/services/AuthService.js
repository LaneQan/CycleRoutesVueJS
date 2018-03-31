import decoder from 'jwt-decode';

class AuthService {
    static authenticateUser(token) {
        localStorage.setItem('token', token);
    }

    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }
    static isAdministratorAuthenticated(token = AuthService.getToken()) {
        return decoder(token).IsAdministrator;
    }

    static deauthenticateUser() {
        localStorage.removeItem('token');
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static getPayload(token = AuthService.getToken()) {
        return decoder(token);
    }

    static getAuthToken() {
        return `Bearer ${localStorage.getItem('token')}`;
    }
}

export default AuthService;
