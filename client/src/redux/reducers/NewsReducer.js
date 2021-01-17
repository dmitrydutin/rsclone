import url1 from '../../images/test.png';
import url2 from '../../images/test1.jpg';
import url3 from '../../images/test2.jpg';
import Api from '../../api/api';

const FETCH_INIT_POSTS = 'FETCH_INIT_POSTS',
    UPDATE_POSTS = 'UPDATE_POSTS';
const initialState = {
    arrPost: [],
};

const NewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_POSTS:
            return { ...state, arrPost: [action.query, ...state.arrPost] };
        case FETCH_INIT_POSTS:
            return {
                arrPost: action.query,
            };
        default:
            return state;
    }
};

export { NewsReducer };
