import axios from 'axios';

const FETCH_PIC = 'FETCH_PIC';
const UPDATE_PIC = 'UPDATE_PIC';
const initialState = {
    url: '',
};

const PicReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PIC:
            console.log('fetchpic');
            const data = new FormData();
            data.append('file', action.query);
            data.append('upload_preset', 'rss-social-network');
            axios
                .post('https://api.cloudinary.com/v1_1/hfb7rj2ks/image/upload', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((response) => response.data.secure_url)
                .then((res) => {
                    console.log('dispatch', res);
                    return { ...state, url: res };
                });
            break;
        case UPDATE_PIC:
            return { ...state, url: action.query };
        default:
            return state;
    }
};

export { PicReducer };
