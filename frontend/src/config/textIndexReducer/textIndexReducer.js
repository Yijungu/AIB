export const CUR_TEXT_INDEX = 'CUR_TEXT_INDEX';

export const setTIndex = (textIndex) => ({
    type: CUR_TEXT_INDEX,
    textIndex

});


const initialState = {
    textIndex: 0
};

export const TextIndexReducer = (state = initialState, action) => {
    switch (action.type) {
        case CUR_TEXT_INDEX:
            return {
                ...state,
                textIndex: action.textIndex
            };
        default:
            return state;
    }
};
