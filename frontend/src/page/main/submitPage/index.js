import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { questionData } from "../../../data/QuestionData";
import { Question } from "../../../components/question/question";
import { Label } from "../../../components/label/label";
import { Comment } from "../../../components/comment/comment";
import { Color } from "../../../components/selectColor/color";
import { Menu } from "../../../components/menu/menu";

const SubmitPage = (props) => {
  const navigate = useNavigate();
  const [text, setText] = useState({
    first_text: "",
    second_text: "",
  });
  const [selectColor, setSelectColor] = useState("");
  const [contents, setContents] = useState([{ select: "", comment: "" }]);

  const { first_text, second_text } = text;

  const onTextChange = (e) => {
    const { name, value } = e.target;
    setText({
      ...text,
      [name]: value,
    });
  };

  const onSelectColorChange = (newColor) => {
    setSelectColor(newColor);
  };

  const onContentsChange = (newComments, newSelects) => {
    const newContents = [
      ...contents,
      { select: newSelects, comment: newComments },
    ];
    setContents(newContents);
    console.log(contents);
  };

  const onClickSubmit = (e) => {
    e.preventDefault();

    const c = [];
    const i_len = contents[contents.length - 1].comment.length;
    for (let i = 0; i < i_len; i++) {
      c.push({
        id: i,
        select: contents[contents.length - 1].select[i],
        comment: contents[contents.length - 1].comment[i],
      });
    }

    axios
      .post("http://localhost:8000/review/", {
        concept: text.first_text,
        include: text.second_text,
        color: selectColor,
        contents: c,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Menu />
      <div id="logo">
        <p style={{ fontSize: 20 }}>
          <b style={{ fontSize: 36, color: "rgb(100,100,255)" }}>A.I.B</b>
          anner
        </p>
      </div>
      <div id="container-First">
        <div id="form-question">
          <Label q={questionData[0]} />
          <Question
            q={questionData[0]}
            name="first_text"
            value={first_text}
            onTextChange={onTextChange}
          />
          <br />
          <Label q={questionData[1]} />
          <Question
            q={questionData[1]}
            name="second_text"
            value={second_text}
            onTextChange={onTextChange}
          />
          <br />
        </div>
        <div id="form-comment">
          <Label q={questionData[2]} />
          <Comment onContentsChange={onContentsChange} />
          <br />
        </div>
        <form>
          <div id="submit">
            <button id="submitButton" type="sumbit" onClick={onClickSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SubmitPage;
