import Router from "./router";
import { createContext, useState, useEffect } from "react";
import {store} from './config/reducer';
import { Provider } from "react-redux";

export const MyContext = createContext();

function App() {
  const [imageUrl, setImageUrl] = useState(
    localStorage.getItem("imageUrl") || null
  );
  const [texts, setTexts] = useState(null);
  const [position, setPosition] = useState(null);
  const [fontSize, setFontSize] = useState(null);
  const [kerning, setKerning] = useState(null);
  const [alignments, setAlignments] = useState(null);

  useEffect(() => {
    localStorage.setItem("imageUrl", imageUrl);
  }, [imageUrl]);

  const value = {
    imageUrl,
    setImageUrl,
    texts,
    setTexts,
    position,
    setPosition,
    fontSize,
    setFontSize,
    kerning,
    setKerning,
    alignments,
    setAlignments,
  };

  return (
    <MyContext.Provider value={value} store={store}>
      <Router />
    </MyContext.Provider>
  );
}

export default App;
