import russian from './russian';
import english from './english';

export function getLanguage(currentlanguage) {
    return currentlanguage === 'english' ? english : russian;
}

export function toggleLanguage(currentLanguage) {
    return currentLanguage === 'english' ? 'русский' : 'english';
}
