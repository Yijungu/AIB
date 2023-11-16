import React from "react";
import "./index.css";
import { useDispatch } from "react-redux";
import { setCurTab } from "../../config/tabReducer/tabReducer";

const Tab = (props) => {
  const tabName = props.tab.tabName;
  const isOn = props.tab.isOn;
  const tabId = props.tab.id;
  const dispatch = useDispatch();

  const changeTab = () => {
    document.querySelector(".tabList li a.on").classList.remove("on");
    document.querySelector(".tabList li a#" + tabId).classList.add("on");
    dispatch(setCurTab(tabId));
  };

  return (
    <li role="presentation" >
      <a
        href="#!"
        role="tab"
        tabIndex="0"
        id={tabId}
        aria-selected={isOn.toString()}
        className={isOn ? "on" : ""}
        onClick={changeTab}
      >
        <span>{tabName}</span>
      </a>
    </li>
  );
};

export const TabList = () => {
  const tabList = [
    { tabName: "색상", id: "colorModify", isOn: true },
    { tabName: "글꼴", id: "textModify", isOn: false },
  ];

  return (
    <ul className="tabList">
      {tabList &&
        tabList.map((v) => {
          return <Tab key={v.id} tab={v} />;
        })}
    </ul>

  );
};
