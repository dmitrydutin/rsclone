import darkTheme from './DarkTheme';
import lightTheme from './LightTheme';

export function getTheme(currentTheme) {
    return currentTheme === 'light' ? lightTheme : darkTheme;
}
