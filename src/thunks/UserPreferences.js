import { changeLanguage } from '../actionCreators/UserPreferences';
import { setLocale } from '../i18n/i18n';

export const setCurrentLanguage = (lang) => (dispatch) => {
    setLocale(lang);
    dispatch(changeLanguage(lang));
};

export const toggleLanguage = () => (dispatch, getState) => {
    //const currentLanguage = getState().userPreferences.language;
    const currentLanguage = getState().UserPreferences.language;
    if (currentLanguage === 'en') {
        dispatch(setCurrentLanguage('hi'));
    } else {
        dispatch(setCurrentLanguage('en'));
    }
};