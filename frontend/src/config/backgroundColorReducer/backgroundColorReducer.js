export const CUR_BG_COLOR = 'CUR_BG_COLOR';
export const setCurBGColor = bgColor => ({
    type: CUR_BG_COLOR,
    payload: {
        bgColor
    }
});


const initialState = {
    bgColor: "#F9A9DE"
};

export const BackgroundColorReducer = (state = initialState, action) => {
    switch (action.type) {
        case CUR_BG_COLOR:
            const { bgColor } = action.payload;
            const newBGColor = { ...state.bgColor };
            newBGColor.bgColor = bgColor;
            return {
                ...state,
                bgColor: newBGColor,
            };
        default:
            return state;
    }
};