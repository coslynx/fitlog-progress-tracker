import api from './api';

const auth = {
    async login(email, password) {
        try {
            const response = await api.login(email, password);
            localStorage.setItem('token', response.token);
            return response;
        } catch (error) {
            throw error;
        }
    },

    async signup(email, password) {
        try {
            const response = await api.signup(email, password);
             localStorage.setItem('token', response.token);
             return response;
        } catch (error) {
            throw error;
        }
    },

    logout() {
        localStorage.removeItem('token');
    },
};

export default auth;