import axios from 'axios';

const FETCH_PIC = 'FETCH_PIC',
    UPDATE_PIC = 'UPDATE_PIC';
const initialState = {
    url: '',
};
const PicReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PIC:
            return { ...state, url: action.query };

        default:           
            return state;
    }
};

export { PicReducer };
