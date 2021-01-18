import { cloudinary } from '../../api/api';

const UPDATE_PIC = 'UPDATE_PIC';

const myPicMiddleware = (store) => (next) => (action) => {
    if (action.type == UPDATE_PIC) {
        cloudinary.uploadImage(action.query).then(response=>response.data.secure_url).then((res)=>{
            store.dispatch({
                type: 'FETCH_PIC',
                query: res,
            });
        })
        
    }
    next(action);
};

export { myPicMiddleware };
