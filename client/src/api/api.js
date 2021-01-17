import axios from 'axios';

const AuthAPI = {
    login(login, password) {
        return axios.post('/api/auth/login', { login, password });
    },
    join(login, password) {
        return axios.post('/api/auth/join', { login, password });
    },
};

const NewsAPI = {
    getPosts() {
        return axios.get('/feed/allposts');
    },
};

export default { NewsAPI, AuthAPI };
