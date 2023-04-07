import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExamplePage from "../page/first/examplePage";
import SubmitPage from "../page/first/submitPage";
import LastPage from "../page/last";
import SecondPage from "../page/second";

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
