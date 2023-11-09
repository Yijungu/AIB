import React from "react";
import "./index.css";
import { useSelector } from "react-redux";
import { TabList } from "../../tabs";
import { ColorModify } from "../../tabs/colorModify/index";
import { TextModify } from "../../tabs/textModify/index";
import { TextBox } from "../../textBox/index";

export const Sidebar = (props) => {
  const {selectedText, displayTab, imgCheck} = props;
  const tabId = useSelector((state) => state.tab.tabId);

  return (
    <div className="sidebar">
      <h2>메뉴</h2>
      <TextBox selectedText={selectedText} />
      
      {displayTab ?
        <div className="content">
          <TabList />
          <div>
            {tabId === "colorModify" ? (
              <ColorModify selectedText={selectedText} imgCheck={imgCheck} />
            ) : (
              <TextModify />
            )}
          </div>
        </div> : null
      }
    </div>
  );
};
