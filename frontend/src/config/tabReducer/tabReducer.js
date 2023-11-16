export const CUR_TAB = 'CUR_TAB';
export const setCurTab = tabId => ({ type: CUR_TAB, tabId });

const initialState = {
    tabId: "colorModify"
};

export const TabReducer = (state = initialState, action) => {
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