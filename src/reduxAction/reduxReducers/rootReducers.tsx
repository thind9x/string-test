import { combineReducers } from 'redux';
import {
    getMessages
} from '../actions';

export const reducers = combineReducers({
    getMessages
});

export const rootReducer = (state: any, action: any) => {
    if (action.type === 'UPDATE_PAGE') {
        console.log(state?.handlePagenation?.next);
    }

    return reducers(state, action);
};
