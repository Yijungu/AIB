import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExamplePage from "../page/main/examplePage";
import SubmitPage from "../page/main/submitPage";
import LastPage from "../page/finalImg";
import SecondPage from "../page/selectImg";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<ExamplePage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/example" element={<ExamplePage />} />
        <Route path="/second" element={<SecondPage />} />
        <Route path="/last" element={<LastPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
