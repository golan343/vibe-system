import styled from "styled-components";

export const break1 = `@media(max-width: 768px)`;
export const break2 = `@media(min-width:769px and max-width: 1200px)`;
export const break3 = `@media(min-width: 1201px)`;



const Div = styled.div`
    border: 1px solid rgba(0, 0, 0, .4);
    width: 95%;
    margin: auto;
    margin-bottom: 15px;
    padding: 15px;
    direction: rtl;
    border-radius: 10px;
    box-shadow: 4px 5px 5px #808080;
    box-sizing: border-box;
`;

const Button = styled.button`
  width: 170px;
  margin: 10px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, .4);
  height: 25px;
  border-radius: 10px;
  box-shadow: 4px 5px 5px #808080;
  font-weight: 600;
  font-size: 15px;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 20px;
  display: block;
`;

const Input = styled.input`
  margin: 5px;
  height: 25px;
  width: 200px;
  font-weight: 600;
  font-size: 15px;
`;

const Option = styled.option`
  font-weight: 600;
  font-size: 15px;
`;

const Select = styled.select`
  margin: 5px;
  height: 30px;
  width: 200px;
  font-weight: 600;
  font-size: 15px;
`; 




export { Div, Button, Label, Input, Select, Option
  };

