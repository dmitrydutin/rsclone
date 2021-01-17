import axios from 'axios';

const AuthAPI = {
    login(login, password) {
        return axios.post('/api/auth/login', { login, password });
    },
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

const NewsAPI = {
    getPosts() {
        return axios.get('/feed/allposts');
    },
};

export { NewsAPI, AuthAPI, cloudinary };
