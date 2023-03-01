import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { questionData } from "../../data/QuestionData";
import { Question } from "../../components/question";
import { Label } from "../../components/label";
import { Comment } from "../../components/comment";

const FirstPage = () => {
  const navigate = useNavigate();
  const [text, setText] = useState({
    first_text: "",
    second_text: "",
    third_text: "",
  });
  const [comments, setComments] = useState([]);

  const { first_text, second_text, third_text } = text;

  const onTextChange = (e) => {
    const { name, value } = e.target;
    setText({
      ...text,
      [name]: value,
    });
    console.log(text);
  };

  const onCommentChange = (newComments) => {
    setComments(newComments);
    console.log(comments);
  };

  const onClickSubmit = () => {
    navigate("/second");
    console.log(text);
  };

  return (
    <div id="container-First">
      <div id="logo">
        <p style={{ fontSize: 20 }}>
          <b style={{ fontSize: 36, color: "rgb(100,100,255)" }}>A.I.B</b>anner
        </p>
      </div>
      <div id="form-question">
        <Label q={questionData[0]} /> <br />
        <Question
          q={questionData[0]}
          name="first_text"
          value={first_text}
          onTextChange={onTextChange}
        />
        <br />
        <Label q={questionData[1]} /> <br />
        <Question
          q={questionData[1]}
          name="second_text"
          value={second_text}
          onTextChange={onTextChange}
        />
        <br />
        <Label q={questionData[2]} /> <br />
        <Question
          q={questionData[2]}
          name="third_text"
          value={third_text}
          onTextChange={onTextChange}
        />
        <br />
      </div>
      <div id="form-comment">
        <label>문구</label>
        <Comment onCommentChange={onCommentChange} />
      </div>
      <form>
        <div id="submit">
          <button id="submitButton" type="sumbit" onClick={onClickSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FirstPage;
