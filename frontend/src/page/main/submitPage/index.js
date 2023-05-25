import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

// components
import { questionData } from "../../../data/QuestionData";
import { Question } from "../../../components/question/question";
import { Label } from "../../../components/label/label";
import { Comment } from "../../../components/comment/comment";
import { Menu } from "../../../components/menu/menu";
import { Logo } from "../../../components/logo/logo";

import { MyContext } from "../../../App";

const SubmitPage = (props) => {
  const context = useContext(MyContext);
  const {
    imageUrl,
    setImageUrl,
    texts,
    setTexts,
    position,
    setPosition,
    fontSize,
    setFontSize,
    kerning,
    setKerning,
    alignments,
    setAlignments,
  } = context;

  const navigate = useNavigate();
  const [text, setText] = useState({
    first_text: "",
    second_text: "",
  });
  const [contents, setContents] = useState([{ select: "", comment: "" }]);

  const { first_text, second_text } = text;

  const onTextChange = (e) => {
    const { name, value } = e.target;
    setText((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onContentsChange = (newComments, newSelects) => {
    const newContent = { select: newSelects, comment: newComments };
    setContents((prevState) => [...prevState, newContent]);
  };

  const onClickSubmit = async (e) => {
    e.preventDefault();

    const c = contents[contents.length - 1].comment.map((comment, index) => ({
      id: index,
      select: contents[contents.length - 1].select[index],
      comment: comment,
    }));

    try {
      const response = await axios.post(
        "http://localhost:8000/aib_request/",
        {
          concept: first_text,
          include: second_text,
          contents: c,
        },
        { responseType: "blob" }
      );

      const imgBlob = await response.data;
      const texts = JSON.parse(response.headers.get("texts"));
      const position = JSON.parse(response.headers.get("position"));
      const font_size = JSON.parse(response.headers.get("font_size"));
      const kerning = JSON.parse(response.headers.get("kerning"));
      const alignments = JSON.parse(response.headers.get("alignments"));

      const imgURL = URL.createObjectURL(imgBlob);
      setImageUrl(imgURL);
      setTexts(texts);
      setPosition(position);
      setFontSize(font_size);
      setKerning(kerning);
      setAlignments(alignments);

      navigate("/last");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Menu />
      <Logo />
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
            <button id="submitButton" type="submit" onClick={onClickSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SubmitPage;
