import { CHANGE_LANGUAGE } from '../actionCreators/UserPreferences';
import { getCurrentLocale } from '../../utils/language.utils';

const initialState = { language: getCurrentLocale() };

const UserPreferences = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LANGUAGE: {
            return { ...state, language: action.payload };
        }
        default:
            return state;
    }
};

export default UserPreferences;