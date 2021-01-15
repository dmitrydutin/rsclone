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
    createPost(post) {
        return axios.post('/feed', post);
    },
};

export default { NewsAPI, AuthAPI };
