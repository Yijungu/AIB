/* ------------------Decoding 과정----------------------- 
import React from "react";

const ImageComponent = ({ images }) => {
  return (
    <div>
      {images.map((encodedImage, index) => (
        <img
          key={index}
          src={`data:image/jpeg;base64,${encodedImage}`}
          alt={`Image ${index + 1}`}
          style={{ width: "200px", height: "200px", margin: "10px" }}
        />
      ))}
    </div>
  );
};

const App = () => {
  const images = ["encodeImage1", "encodeImage2", "encodeImage3"];

  return (
    <div>
      <h1>Decoded Images</h1>
      <ImageComponent images={images} />
    </div>
  );
};

export default App;
----------------------------------------------------- */
import Ham0 from "../image/ham0.png";
import Ham1 from "../image/ham1.png";
import Ham2 from "../image/ham2.png";
export const image = [Ham0, Ham1, Ham2]  // 1차원 배열
export const changed_texts = [
  ["AIB 프로젝트의", "데모버젼 실험 데이터", "성공 기원"],
  ["AIB Project의", "Demo version 실험 데이터", "success 기원"],
  ["AIB ", "데모버젼", "성공"]
]  // 2차원 배열
export const position = [
  [{ x: 400, y: 200 }, { x: 500, y: 250 }, { x: 800, y: 340 }],
  [{ x: 400, y: 200 }, { x: 500, y: 250 }, { x: 800, y: 340 }],
  [{ x: 400, y: 200 }, { x: 500, y: 250 }, { x: 800, y: 340 }]
]  // 2차원 배열
export const font_size = [
  [50, 25, 20],
  [50, 25, 20],
  [50, 25, 20]
] // 2차원 배열
export const kerning = [
  [0.325, 0.793, 0.842],
  [0.325, 0.793, 0.842],
  [0.325, 0.793, 0.842]
] // 2차원 배열
export const alignments = [
  ["left", "left", "left"],
  ["left", "left", "left"],
  ["left", "left", "left"]
] // 2차원 배열
export const text_color = [
  ["#1e2b67", "#ffd400", "#bfff00"],
  ["#1e2b67", "#ffd400", "#bfff00"],
  ["#1e2b67", "#ffd400", "#bfff00"],
] // 2차원 배열

export let select_image_index = 0;

export const setSelectImageIndex = (newValue) => {
  select_image_index = newValue;
}