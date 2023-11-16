import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExamplePage from "../page/main/examplePage";
import SubmitPage from "../page/main/submitPage";
import LastPage from "../page/finallyImg";
import SelectPage from "../page/selectImg";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<SubmitPage />} />
        <Route path="/example" element={<ExamplePage />} />
        <Route path="/select" element={<SelectPage />} />
        <Route path="/last" element={<LastPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
