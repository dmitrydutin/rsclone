import axiosLib from 'axios';

const axios = axiosLib.create({
    validateStatus: (status) => {
        return status >= 200 && status < 600;
    },
});

const getAuthHeaders = (token) => {
    return token ? { Authorization: token } : {};
};

const cloudinary = {
    uploadImage(image) {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'rss-social-network');

        return axios.post('https://api.cloudinary.com/v1_1/hfb7rj2ks/image/upload', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};

const AuthAPI = {
    login(login, password) {
        return axios.post('/api/auth/login', { login, password });
    },
    join(name, surname, login, password) {
        return axios.post('/api/auth/join', { name, surname, login, password });
    },
    me(token) {
        return axios.post('/api/auth/me', {}, { headers: getAuthHeaders(token) });
    },
    logout(token) {
        return axios.post('/api/auth/logout', {}, { headers: getAuthHeaders(token) });
    },
};

export const ChatAPI = {
    getDialogs(token, userId) {
        return axios.get('/api/dialogs/', {
            params: { userId },
            headers: getAuthHeaders(token),
        });
    },
    getMessages(token, dialogId) {
        return axios.get('/api/messages/', {
            params: { dialogId },
            headers: getAuthHeaders(token),
        });
    },
};

const NewsAPI = {
    sendPost(token, post) {
        return axios.post('/api/feed/posts', post, { headers: getAuthHeaders(token) });
    },
    sendComment(token, comment) {
        return axios.post('/api/feed/comments', comment, { headers: getAuthHeaders(token) });
    },
    getPosts(token) {
        return axios.get('/api/feed/posts', { headers: getAuthHeaders(token) });
    },
    getComments(token, postId) {
        return axios.get('/api/feed/comments', {
            params: { postId },
            headers: getAuthHeaders(token),
        });
    },
    setLike(token, like) {
        return axios.post('/api/feed/likes', like, { headers: getAuthHeaders(token) });
    },
};

export { cloudinary, AuthAPI, NewsAPI };
