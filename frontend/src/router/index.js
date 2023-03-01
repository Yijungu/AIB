import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstPage from "../page/first";
import LastPage from "../page/last";
import SecondPage from "../page/second";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/second" element={<SecondPage />} />
        <Route path="/last" element={<LastPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
