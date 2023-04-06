import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { MinusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Select } from "./select";

export const Comment = (props) => {
  const [comments, setComments] = useState(props.comments || [""]);
  const [selectedOptions, setSelectedOptions] = useState(
    props.selectedOptions || [""]
  );

  const addComment = () => {
    const newComments = [...comments, ""];
    setComments(newComments);

    const newSelectedOptions = [...selectedOptions, ""];
    setSelectedOptions(newSelectedOptions);
  };

  const deleteComment = (index) => {
    const newComments = [...comments];
    newComments.splice(index, 1);
    setComments(newComments);

    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions.splice(index, 1);
    setSelectedOptions(newSelectedOptions);
  };

  const onTextChange = (index, e) => {
    const newComments = [...comments];
    newComments[index] = e.target.value;
    setComments(newComments);
    props.onContentsChange(newComments, selectedOptions);
  };

  const onOptionChange = (index, e) => {
    const newSelects = [...selectedOptions];
    newSelects[index] = e.target.value;
    setSelectedOptions(newSelects);
    props.onContentsChange(props.comment, newSelects);
  };

  return (
    <div className="comment-class">
      {comments.map((comment, index) => (
        <div className="form-comment" key={index}>
          <Select
            index={index}
            comment={comment[index]}
            selectedOption={selectedOptions[index]}
            onChange={(e) => onOptionChange(index, e)}
            onContentsChange={props.onContentsChange}
          />
          <TextareaAutosize
            id="comment-textareaauto"
            className="textareaauto"
            minRows={5}
            value={comment || ""}
            onChange={(e) => onTextChange(index, e)}
          />
          {comments.length > 1 && (
            <Button
              className="delete-button"
              onClick={() => deleteComment(index)}
            >
              <MinusCircleOutlined />
              Delete
            </Button>
          )}
        </div>
      ))}
      <Button onClick={() => addComment()}>
        <PlusCircleOutlined />
        Add Comment
      </Button>
    </div>
  );
};
