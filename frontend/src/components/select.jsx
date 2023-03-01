import { useState } from "react";
import styled from "styled-components";

const SelectStyle = styled.select`
  &:focus {
    border-color: red;
  }
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const IconSVG = styled.svg`
  margin-left: -28px;
  align-self: center;
  width: 24px;
  height: 24px;
`;

export const Select = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const onOptionChange = (e) => {
    setSelectedOption(e.target.value);
    console.log(selectedOption);
  };

  return (
    <SelectStyle
      id="form-select"
      value={selectedOption}
      onChange={onOptionChange}
    >
      <option key="test1" value="test1">
        test1
      </option>
      <option key="test2" value="test2">
        test2
      </option>
      <IconSVG
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 14L16 6H4L10 14Z"
          fill="#1A1A1A"
        />
      </IconSVG>
    </SelectStyle>
  );
};
