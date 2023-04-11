import TextareaAutosize from "react-textarea-autosize";

export const Question = (props) => {
  return (
    <TextareaAutosize
      id={props.q.id}
      className="textareaauto"
      minRows={5}
      name={props.name}
      value={props.value}
      placeholder={props.q.ph}
      onChange={props.onTextChange}
    />
  );
};
