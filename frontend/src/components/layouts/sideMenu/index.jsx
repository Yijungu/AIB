import React from "react";
import "./index.css";
import { TabList } from "../../tabs";

export const Sidebar = () => {

  return (
    <div className="sidebar">
      <div className="content">
        <h2>색상</h2>
        <div>
          <TabList/>
        </div>
      </div>
    </div>
  );
};
