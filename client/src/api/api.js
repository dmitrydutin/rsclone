import axios from 'axios';

export const AuthAPI = {
    login(login, password) {
        return axios.post('/api/auth/login', { login, password });
    },
    join(login, password) {
        return axios.post('/api/auth/join', { login, password });
    },
};
