import Router from "./router";
import { createContext } from "react";

export const MyContext = createContext();
function App() {
  return (
    <MyContext.Provider>
      <Router />
    </MyContext.Provider>
  );
}

export default App;
