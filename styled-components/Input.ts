import styled from "styled-components";

export const Input = styled.input`
  color: rgb(14 116 144);
  font-weight: 400;
  font-size: 18px;
  font-family: sans-serif;
  margin: 10px 0px 10px 0px;
  padding: 10px 0px 10px 0px;
  border: 0px;
  background-color: transparent;
  border-bottom: 2px solid rgb(42, 71, 96);
  width: 300px;
  height: 35px;

  &:focus {
    outline: none;
  }
`;

export const Label = styled.label`
  color: white;
  font-weight: 200;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
