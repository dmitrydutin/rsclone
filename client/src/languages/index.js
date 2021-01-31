import russian from './russian';
import english from './english';

export function getLanguage(currentLanguage) {
    return currentLanguage === 'english' ? english : russian;
}
