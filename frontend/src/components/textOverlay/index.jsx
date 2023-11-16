import React from "react";

export const TextOverlay = ({
    positions,
    fontSizes,
    letterSpacings,
    colors,
    alignments,
    texts
}) => {
    return (
        <>
            {texts.map((text, index) => (
                <div
                    key={index}
                    style={{
                        position: "absolute",
                        left: `${positions[index].x + 50}px`,
                        top: `${positions[index].y + 80}px`,
                        fontSize: `${fontSizes[index]}px`,
                        letterSpacing: `${letterSpacings[index]}px`,
                        color: colors[index],
                        textAlign: alignments[index],
                    }}
                >
                    {text}
                </div>
            ))}
        </>
    );
};
