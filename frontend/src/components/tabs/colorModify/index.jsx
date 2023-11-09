import React from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { setFontData } from "../../../config/fontReducer/fontReducer";
import { setCurBGColor } from "../../../config/backgroundColorReducer/backgroundColorReducer";

const textOptionColors = [
    { bg: "#4A90E2", fc: "#D0021B" },
    { bg: "#9B9B9B", fc: "#9013FE" },
    { bg: "#417505", fc: "#8B572A" },
    { bg: "#FF008E", fc: "#000000" },
    { bg: "#ffffff", fc: "#430101" },
];

export const ColorModify = (props) => {
    const { imgCheck } = props;

    const font = useSelector(state => state.font.textElement);
    const bgColor = useSelector(state => state.bgColor.bgColor);
    const dispatch = useDispatch();

    const circleColors = textOptionColors.map(color =>
        `conic-gradient(${color.bg} 0deg 180deg, ${color.fc} 180deg 360deg, transparent 240deg 360deg)`
    );

    const handleChangeColor = (index) => {
        console.log("hcc:", bgColor);
        dispatch(setFontData(index, font.fontSizes, textOptionColors[index].fc));
        dispatch(setCurBGColor(textOptionColors[index].bg));
    }

    return (
        <div>
            {!imgCheck ?
                <div> 해당 배너에서는 지원하지 않는 기능입니다. </div>
                :
                <div className="circleList">
                    {circleColors.map((style, index) => (
                        <span
                            key={"circle" + index}
                            id={"circle" + index}
                            style={{ background: style }}
                            onClick={() => handleChangeColor(index)}
                        />
                    ))}
                </div>
            }
        </div>
    )
};
