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
    testSession(token) {
        return axios.post('/api/example/', {}, { headers: getAuthHeaders(token) });
    },
};

const NewsAPI = {
    getPosts() {
        return axios.get('/feed/allposts');
    },
};

export { NewsAPI, AuthAPI, cloudinary };
