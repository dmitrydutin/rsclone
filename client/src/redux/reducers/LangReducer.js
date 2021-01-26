import englishLanguage from '../../languages/english';
import russianLanguage from '../../languages/russian';
import belarussianLanguage from '../../languages/belarussian';

const SET_ENGLISH = 'SET_ENGLISH',
    SET_BELARUSSIAN = 'SET_BELARUSSIAN',
    SET_RUSSIAN = 'SET_RUSSIAN';
const initialState = {
    language: englishLanguage,
    status: 'ENGLISH',
};
const LangReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RUSSIAN:
            return { language: russianLanguage, status: 'РУССКИЙ' };
        case SET_BELARUSSIAN:
            return { language: belarussianLanguage, status: 'БЕЛАРУСКАЯ' };
        case SET_ENGLISH:
            return { language: englishLanguage, status: 'ENGLISH' };
        default:
            return state;
    }
};

export { LangReducer };
