import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExamplePage from "../page/main/examplePage";
import SubmitPage from "../page/main/submitPage";
import LastPage from "../page/finallyImg";
import SecondPage from "../page/selectImg";
import LoginPage from "../page/login";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/example" element={<ExamplePage />} />
        <Route path="/second" element={<SecondPage />} />
        <Route path="/last" element={<LastPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
