import React from 'react'
import styled from 'styled-components';
const Input = ({type, placeHolder, required, name, onChange, onKeyDown}) => {



  return (
    <CustomInput 
      type={type} 
      placeholder={placeHolder} 
      required={required} 
      onChange={onChange}   
      name={name}
      onKeyDown={onKeyDown}
    />
  )
}

export default Input;



const CustomInput = styled.input`
  /* display: block; */
  margin: auto;
  border-radius: 5px;
  border: 1px solid;
  height: 25px;
  text-align: center;
  font-size: 20px;
  margin: 4px;
`;


