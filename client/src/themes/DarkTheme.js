const darkTheme = {
    palette: {
        type: 'dark',
        primary: {
            main: '#90CAF9',
            contrastText: '#1A202C',
        },
        background: {
            default: '#202124',
            paper: '#2E2F32',
        },
        header: {
            background: '#2E2F32',
            border: '#17181A',
            contrastText: '#EEEEEF',
        },
        newsfeed:{
            contrastText: '#FFFFFF',
        },
        post:{
            default:'#333e54'
        },
        footer: {
            background: '#2E2F32',
            border: '#17181A',
        },
        button: {
            hover: {
                color: '#fff',
                background: 'rgba(144, 202, 249, 0.1)',
            },
            selected: {
                background: '#DADBF0',
            },
        },
        chat: {
            background: '#202124',
            color: '#fff',
        },
        chatMessagesSelf: {
            background: '#000',
            color: '#fff',
        },
        chatMessagesFriend: {
            background: '#202124',
            color: '#000',
        },
        messageArea: {
            background: '#2E2F32',
        }
    },
};

// const darkTheme = {
//     palette: {
//         type: 'dark',
//         default: {
//             light: '#000',
//             main: '#2E2F32',
//             dark: '#000',
//             contrastText: '#fff',
//         },
//         primary: {
//             light: '#eee',
//             main: '#90CAF9',
//             dark: '#638BAC',
//             contrastText: '#000',
//         },
//         secondary: {
//             light: '#AA647B',
//             main: '#F48FB1',
//             dark: '#AA647B',
//             contrastText: '#000',
//         },
//         error: {
//             light: '#fff',
//             main: '#FF4B4B',
//             dark: '#fff',
//             contrastText: '#fff',
//         },
//         text: {
//             primary: '#fff',
//             secondary: '#fff',
//         },
//         background: {
//             default: '#202124',
//             paper: '#2E2F32',
//         },
//     },
// };

export default darkTheme;
