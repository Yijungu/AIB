import React, { useState } from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { setFontData } from "../../config/fontReducer/fontReducer";

const styles = reactCSS({
    'default': {
        swatch: {
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
        },
        popover: {
            position: 'absolute',
            zIndex: '2',
        },
        cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        },
    },
});

export const SelectColorBox = (props) => {
    const font = useSelector(state => state.font.textElement);
    const tIndex = useSelector(state => state.tIndex.textIndex);
    const dispatch = useDispatch();

    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    let curFontColor = font.fontColors[tIndex];

    const handlePickerClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    }

    const handleColorChange = (color) => {
        const newFontColor = color.hex;
        curFontColor = newFontColor;
        dispatch(setFontData(props.tIndex, font.fontSizes[props.tIndex], curFontColor));
    }
    console.log("scb:", curFontColor);
    return (
        <div>
            <div style={styles.swatch} onClick={handlePickerClick}>
                <div
                    style={{
                        width: '50px',
                        height: '15px',
                        borderRadius: '2px',
                        backgroundColor: curFontColor
                    }}
                />
            </div>
            {displayColorPicker ?
                <div style={styles.popover}>
                    <div style={styles.cover} onClick={handlePickerClick} />
                    <SketchPicker color={curFontColor} onChange={handleColorChange} />
                </div>
                : null}

        </div>
    );
}