import Router from "./router";
import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

function App() {
  const [imageUrl, setImageUrl] = useState(localStorage.getItem("imageUrl") || null);

  useEffect(() => {
    localStorage.setItem("imageUrl", imageUrl);
  }, [imageUrl]);

  const value = {
    imageUrl,
    setImageUrl,
  };

  return (
    <MyContext.Provider value={value}>
      <Router />
    </MyContext.Provider>
  );
}

export default App;