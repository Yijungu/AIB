import React from "react";
import "./index.css";
import html2Canvas from "html2canvas";

export const DownloadButton = () => {
    const onCapture = () => {
        const element = document.getElementsByClassName("image-and-text")[0];
    
        if (element) {
            html2Canvas(element).then(
                (canvas) => {
                    onSaveAs(canvas.toDataURL("image/png"), "download_success.png");
                },
                (error) => {
                    console.error("html2Canvas 변환 중 오류 발생:", error);
                }
            );
        } else {
            console.error("선택한 요소가 문서에 존재하지 않습니다.");
        }
    };
    

    const onSaveAs = (uri, filename) => {
        const link = document.createElement('a');
        document.body.appendChild(link);
        link.href = uri;
        link.download = filename;
        link.click();
        document.body.removeChild(link);
    }

    return (
        <>
            <button id="download-button" onClick={onCapture}>
                다운로드
            </button>
        </>
    );
};