import darkTheme from './DarkTheme';
import lightTheme from './LightTheme';

export function getTheme(currentTheme) {
    return currentTheme === 'light' ? lightTheme : darkTheme;
}

export function toggleTheme(currentTheme) {
    return currentTheme === 'light' ? 'dark' : 'light';
}
