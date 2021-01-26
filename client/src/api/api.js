import axiosLib from 'axios';

const axios = axiosLib.create({
    validateStatus: (status) => {
        return status >= 200 && status < 600;
    },
});

const getAuthHeaders = (token) => {
    return token ? { Authorization: token } : {};
};

export const cloudinary = {
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

export const AuthAPI = {
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
