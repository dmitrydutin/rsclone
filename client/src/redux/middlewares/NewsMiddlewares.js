import url1 from '../../images/test.png';
import url2 from '../../images/test1.jpg';
import url3 from '../../images/test2.jpg';
import Api from '../../api/api';

const UPDATE_POSTS = 'UPDATE_POSTS',
    INIT_POSTS = 'INIT_POSTS',
    FETCH = 'FETCH',
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE';

const myMiddleware = (store) => (next) => (action) => {
    //try {

    if (action.type == INIT_POSTS) {
        Api.NewsAPI.getPosts()
            .then((response) => response.data)
            .then((el) => {
                store.dispatch({
                    type: 'FETCH_INIT_POSTS',
                    query: el,
                });
                console.log('INIT_POSTS');
            });
    }
    // } catch (err) {
    //     store.dispatch({ type: FAILURE });
    // }
    next(action);
};

export { myMiddleware };
