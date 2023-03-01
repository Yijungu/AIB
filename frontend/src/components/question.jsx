import TextareaAutosize from "react-textarea-autosize";

export const Question = (props) => {
  return (
    <TextareaAutosize
      id={props.q.id}
      className="question-class"
      minRows={5}
      cols={100}
      name={props.name}
      value={props.value}
      placeholder={props.q.ph}
      onChange={props.onTextChange}
    />
  );
};
