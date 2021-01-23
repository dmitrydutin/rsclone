import darkTheme from '../../themes/DarkTheme';
import lightTheme from '../../themes/LightTheme';

const CHANGE_THEME = 'CHANGE_THEME';
const initialState = {
    theme: lightTheme,
    light: true,
};
const ThemeReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            if (state.light) return { theme: darkTheme, light: false };
            return { theme: lightTheme, light: true };
        default:
            console.log(state)
            return state;
    }
};

export { ThemeReducer };
