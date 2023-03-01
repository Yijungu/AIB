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
    props.onCommentChange(newComments, selectedOptions);
  };

  const deleteComment = (index) => {
    const newComments = [...comments];
    newComments.splice(index, 1);
    setComments(newComments);
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions.splice(index, 1);
    setSelectedOptions(newSelectedOptions);
    props.onCommentChange(newComments, newSelectedOptions);
  };

  const onTextChange = (index, e) => {
    const newComments = [...comments];
    newComments[index] = e.target.value;
    setComments(newComments);
    props.onCommentChange(newComments, selectedOptions);
  };

  const onSelectedOptionChange = (index, e) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = e.target.value;
    setSelectedOptions(newSelectedOptions);
    props.onCommentChange(comments, newSelectedOptions);
  };

  return (
    <div className="comment-class">
      {comments.map((comment, index) => (
        <div className="form-comment" key={index}>
          <Select
            value={selectedOptions[index] || ""}
            onChange={(e) => onSelectedOptionChange(index, e)}
          />
          <TextareaAutosize
            id=""
            className="comment-outline"
            minRows={5}
            cols={100}
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
