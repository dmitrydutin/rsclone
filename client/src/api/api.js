import axios from 'axios';

export const AuthAPI = {
    login(login, password) {
        return axios.post('/api/auth/login', { login, password });
    },
};

export const cloudinary = {
    uploadImage(image) {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'rss-social-network');

        return axios.post(
            'https://api.cloudinary.com/v1_1/hfb7rj2ks/image/upload',
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
    },
};
