import React, { useState } from 'react';
import styled from 'styled-components';
import Title from './Title';
import CustomInput from './CustomInput';
import axios from 'axios';
import { BaseUrl } from '../config';
import { useNavigate } from 'react-router-dom';

const initialUserValue = {
  userName: '',
  password: '',
  firstName: '',
  lastName: '',
  email: ''
};
const initialErrorsValue = { 
  userNameErr: '', 
  passwordErr: '', 
  firstNameErr: '', 
  lastNameErr: '', 
  emailErr: '' 
}

const SignUp = () => {
  const [user, setUser] = useState(initialUserValue);
  const [validatePass, setValidatePass] = useState('');
  const [errors, setErrors] = useState(initialErrorsValue);
  const navigate = useNavigate();


  const handleChange = (e) => {
    try {
      switch (e.target.name) {
        case 'userName': {
            setErrors(prevState => ({...prevState, userNameErr: ''}));
            setUser(prevState => ({...prevState, userName: e.target.value}));
          break;
        }
        case 'password': {
          if(e.target.value.length < 5){
            setErrors(prevState => ({...prevState, passwordErr: 'Password Must be bigger then 5 char'}));
          }else{
            setErrors(prevState => ({...prevState, passwordErr: ''}));
            setUser(prevState => ({...prevState, password: e.target.value}));
          }
          break;
        }
        case 'firstName': {
            setErrors(prevState => ({...prevState, firstNameErr: ''}));
            setUser(prevState => ({...prevState, firstName: e.target.value}));
          break;
        }
        case 'lastName': {
          setErrors(prevState => ({...prevState, lastNameErr: ''}));
          setUser(prevState => ({...prevState, lastName: e.target.value}));
          break;
        }
        case 'email': {
          setErrors(prevState => ({...prevState, emailErr: ''}));
          setUser(prevState => ({...prevState, email: e.target.value}));
          break;
        }
        default: {
          break;
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleSignUp = async () => {
    try {
      switch(true){
        case user.userName === '' || user.userName.length < 5 : {
          return setErrors(prevState => ({...prevState, userNameErr: 'Please enter User Name bigger then 5 charts'}));
        }
        case user.password !== validatePass: {
          return setErrors(prevState => ({...prevState, passwordErr: 'Passwords not match'}));
        }
        case user.firstName === '' || user.firstName.length < 2 : {
          return setErrors(prevState => ({...prevState, firstNameErr: 'Please enter First Name bigger then 2 charts'}));
        }
        case user.lastName === '' || user.lastName.length < 2 : {
          return setErrors(prevState => ({...prevState, lastNameErr: 'Please enter Last Name bigger then 2 charts'}));
        }
        case user.email === '' || !/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(user.email): {
         return setErrors(prevState => ({...prevState, emailErr: 'Invalid Email: Please enter valid email'}));
        } 
      }
      
      const { data } = await axios.post(`${BaseUrl}/auth/register`, user);
      data ? navigate('/') : '';

    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <Container>
      <Title text="הרשמה" />
      <Form action=''>
        <Div>
          <CustomInput type="text" placeHolder='שם משתמש' required={true} name='userName' onChange={(e) => handleChange(e)} />
          {errors?.userNameErr && <Error>{errors.userNameErr}</Error>}
          <CustomInput type="password" placeHolder="סיסמא" required={true} name="password" onChange={(e) => handleChange(e)} />
          {errors?.passwordErr && <Error>{errors.passwordErr}</Error>}
          <CustomInput type="password" placeHolder="אימות סיסמא" required={true} name="validatePassword" onChange={(e) => setValidatePass(e.target.value)} />
        </Div>
        <Div>
          <CustomInput type="text" placeHolder='שם פרטי' required={true} name='firstName' onChange={(e) => handleChange(e)} />
          {errors?.firstNameErr && <Error>{errors.firstNameErr}</Error>}
          <CustomInput type="text" placeHolder='שם משפחה' required={true} name='lastName' onChange={(e) => handleChange(e)} />
          {errors?.lastNameErr && <Error>{errors.lastNameErr}</Error>}
          <br /><br />
          <CustomInput type="email" placeHolder='אימייל' required={true} name='email' onChange={(e) => handleChange(e)} />
          {errors?.emailErr && <Error>{errors.emailErr}</Error>}
        </Div>

        <Button onClick={() => handleSignUp()}>הרשמה</Button>
        <Button onClick={() => navigate('/')}>כניסה למערכת</Button>
        

      </Form>
    </Container>
  )
}

export default SignUp;


const Container = styled.div`
  /* border: 1px solid black; */
  height: 100%;
  min-width: 100%;
  text-align: center;
`;

const Form = styled.div`

`;

const Div = styled.div`
/* border: 1px solid black; */
direction: rtl;
display: block;
margin: 10px;
`;

const Button = styled.button`
  width: 250px;
  height: 35px;
  font-size: 20px;
  font-weight: 600;
  background-color: #d1d1d1;
  /* border: 1px solid black; */
  border-radius: 5px;
  box-shadow: 2px 4px 3px #808080;
  /* height: 10px; */
  margin-bottom: 15px;
  :hover{
    background-color: #0f0;
    cursor: pointer;
  }
`;

const Error = styled.p`
  color: red;
  font-weight: 600;
  margin: 0;

`;


