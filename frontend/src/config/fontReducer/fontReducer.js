import { font_size, text_color, select_image_index } from '../../data/testData';

export const SET_FONT_DATA = 'SET_FONT_DATA';

export const setFontData = (index, fontSizes, fontColors) => ({
    type: SET_FONT_DATA,
    payload: {
        index,
        fontSizes,
        fontColors,
    }
});

const initialState = {
    textElement: {
        fontSizes: font_size[select_image_index],
        fontColors: text_color[select_image_index],
    },
};

export const FontReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FONT_DATA:
            const { index, fontSizes, fontColors } = action.payload;
            const newTextElement = { ...state.textElement };
            newTextElement.fontSizes[index] = fontSizes;
            newTextElement.fontColors[index] = fontColors;
            return {
                ...state,
                textElement: newTextElement,
            };
        default:
            return state;
    }
};
