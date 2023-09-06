import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const CUR_TAB = 'CUR_TAB';
export const setCurTab = tabId => ({ type: CUR_TAB, tabId });

const rootReducer = (state = { tabId: 'color' }, action) => {
    switch (action.type) {
        case CUR_TAB:
            return {
                ...state,
                tabId: action.tabId
            };
        default:
            return state;
    }
};

const enhancer = composeWithDevTools(applyMiddleware(logger));
export const store = createStore(rootReducer, enhancer);