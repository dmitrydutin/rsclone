import url1 from '../../images/test.png';
import url2 from '../../images/test1.jpg';
import url3 from '../../images/test2.jpg';

const UPDATE_POSTS='UPDATE_POSTS';
const initialState = {
    arrPost: [
        {
            id: 0,
            username: 'asbarn',
            text:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat quis tellus ut vulputate. Morbi accumsan purus in erat sagittis, at pulvinar orci ullamcorper. Phasellus eleifend, nisl a porta laoreet, dolor elit congue libero, in tincidunt felis lorem vel lacus. Aenean vitae finibus ligula, sed feugiat felis.',
            img: url1,
            likes: 0,
            dislikes: 0,
            date: '09-01-2021',
        },
        {
            id: 1,
            username: '123',
            text:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat quis tellus ut vulputate. Morbi accumsan purus in erat sagittis, at pulvinar orci ullamcorper. Phasellus eleifend, nisl a porta laoreet, dolor elit congue libero, in tincidunt felis lorem vel lacus. Aenean vitae finibus ligula, sed feugiat felis.',
            likes: 10,
            dislikes: 50,
            date: '09-01-2021',
        },
        {
            id: 2,
            username: '123asbarn',
            img: url2,
            likes: 20,
            dislikes: 10,
            date: '09-01-2021',
        },
        {
            id: 3,
            username: 'asbarn456',
            text:
                'Donec auctor sapien quam, ac elementum leo egestas nec. Proin eget bibendum nibh. Suspendisse elementum in magna non aliquet.',
            img: url3,
            likes: 30,
            dislikes: 0,
            date: '09-01-2021',
        },
    ],
};

export const NewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_POSTS:
        return {...state,
        arrPost: [action.query, ...state.arrPost]
        };
        default:
            return state;
    }
};
