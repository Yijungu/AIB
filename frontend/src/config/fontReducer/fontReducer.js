export const SET_FONT_DATA = 'SET_FONT_DATA';

export const setFontData = (index, fontSizes, fontColor) => ({
    type: SET_FONT_DATA,
    payload: {
        index,
        fontSizes,
        fontColor,
    }
});

const initialState = {
    textElement: {
        fontSizes: [30, 55], // array(int)
        fontColor: "#000000", // string
    },
};

export const FontReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FONT_DATA:
            const { index, fontSizes, fontColor } = action.payload;
            const newTextElement = { ...state.textElement };
            newTextElement.fontSizes[index] = fontSizes;
            newTextElement.fontColor = fontColor;
            return {
                ...state,
                textElement: newTextElement,
            };
        default:
            return state;
    }
};
