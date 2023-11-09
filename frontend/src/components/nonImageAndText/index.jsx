import React, { useState, useEffect } from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { setTIndex } from "../../config/textIndexReducer/textIndexReducer";

export const NonImageAndText = (props) => {
    const { realTestNBImage } = props;

    const font = useSelector(state => state.font.textElement);
    const bgColor = useSelector(state => state.bgColor.bgColor.bgColor);
    const dispatch = useDispatch();

    const [textIndex, setTextIndex] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [textPositions, setTextPositions] = useState(realTestNBImage.positions);

    const handleTextClick = (index) => {
        props.handleSelectedText(realTestNBImage.texts[index]);
        props.handleDisplayTabShow();
        dispatch(setTIndex(index));
    };

    const handleMouseDown = (e, index) => {
        setDragging(true);
        setTextIndex(index);
        setStartPos({
            x: e.clientX - textPositions[index].x,
            y: e.clientY - textPositions[index].y,
        });
    };

    const handleMouseMove = (e) => {
        if (!dragging || textIndex === null) return;
        const newPosition = {
            x: e.clientX - startPos.x,
            y: e.clientY - startPos.y,
        };
        setTextPositions((prevPositions) =>
            prevPositions.map((pos, index) =>
                index === textIndex ? newPosition : pos
            )
        );
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging, startPos]);

    const handleResetButtonClick = () => {
        setTextIndex(null);
        setDragging(false);
        setTextPositions(realTestNBImage.positions);
    }

    return (
        <>
            <div
                className="image-and-text"
                style={{
                    position: "absolute",
                    display: "inline-block"
                }}
            >
                <div
                    style={{
                        padding: "50px 80px",
                        width: "1024px",
                        height: "512px",
                        backgroundClip: "content-box",
                        backgroundColor: bgColor,
                    }}
                >
                    <img
                        src={realTestNBImage.product}
                        style={{
                            display: "inline-flex",
                            width: "50%",
                        }}
                    />
                    {realTestNBImage.texts.map((text, index) => (
                        <div
                            className="text-wrapper"
                            key={index}
                            style={{
                                display: "inline-block",
                                position: "absolute",
                                left: `${textPositions[index].x + 50}px`,
                                top: `${textPositions[index].y + 80}px`,
                                fontSize: font.fontSizes[index] + "px",
                                letterSpacing: realTestNBImage.kerning[index] + "px",
                                color: font.fontColor,
                                textAlign: realTestNBImage.alignment,
                            }}
                            onClick={() => handleTextClick(index)}
                            onMouseDown={(e) => handleMouseDown(e, index)}
                        >
                            {text}
                        </div>
                    ))}
                </div>
            </div>
            <div
                style={{
                    position: "absolute",
                    display: "flex"
                }}
            >
                <button
                    id="reset-btn"
                    onClick={handleResetButtonClick}
                >
                    원래대로
                </button>
            </div>
        </>
    );
};