import Router from "./router";
import { createContext, useState, useEffect } from "react";
// import store from "./config/store";
// import { Provider } from "react-redux";

export const MyContext = createContext();

function App() {
  const [imageUrl, setImageUrl] = useState(
    localStorage.getItem("imageUrl") || null
  );

  useEffect(() => {
    localStorage.setItem("imageUrl", imageUrl);
  }, [imageUrl]);

  return (
    // <Provider store={store}>
    <Router />
    // </Provider>
  );
}

export default App;
