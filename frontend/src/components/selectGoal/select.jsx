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

export const Select = (props) => {
  return (
    <SelectStyle
      id="form-select"
      value={props.selectOption}
      onChange={props.onChange}
    >
      <option key="nullKey" value="null">
        - 선택 -
      </option>
      <option key="test1" value="big_comment">
        큰 홍보 문구
      </option>
      <option key="test2" value="small_comment">
        작은 홍보 문구
      </option>
      <option key="test3" value="time_space">
        시간&장소
      </option>
      <option key="test3" value="description">
        상세 설명
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
