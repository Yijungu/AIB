import React from "react";
import { TopMenu } from "./topMenu/index";
import { Sidebar } from "./sideMenu/index";

export const Layout = (props) => {
  const { selectedText, displayTab, imgCheck } = props;
  
  return (
    <>
      <TopMenu />
      <main>{props.children}</main>
      <Sidebar
        selectedText={selectedText}
        displayTab={displayTab}
        imgCheck={imgCheck}
      />
    </>
  );
};
