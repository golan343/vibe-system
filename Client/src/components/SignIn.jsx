import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Title from './Title';
import CustomInput from './CustomInput';
import axios from 'axios';
import { BaseUrl } from '../config';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/features/userSlice';
import { useCookies } from 'react-cookie';

import logo from '../vibe-logo.png';
import Spinner from './Spinner';

const initialUserValue = {
  userName: '',
  password: '',
};

const SignIn = () => {
  const [user, setUser] = useState(initialUserValue);
  const [errors, setErrors] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['user']);
  const auth = useSelector((state) => state.auth.auth);
  const navigate = useNavigate();

  

  useEffect(() => {
    if(auth && cookies["user"] == "undefined") {
      setCookie('user', auth, {path: '/'})
    } else if (!auth && cookies["user"] != "undefined"){
      dispatch(login(cookies["user"]))
    }
  }, [])

  useEffect(()=> {
    if(auth?.user){
      navigate('/calander');
    }
  }, [])


  const handleChange = (e) => {
    try {
      setErrors('');
      switch (e.target.name) {
        case 'userName': {
            setUser(prevState => ({...prevState, userName: e.target.value}));
          break;
        }
        case 'password': {
            setUser(prevState => ({...prevState, password: e.target.value}));
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

  const handleSignIn = async () => {
    try {
      setIsSubmit(true);
      const { data } = await axios.post(`${BaseUrl}/auth/login`, user);
      if(data){
        setCookie('user', data, {path: '/'})
        sessionStorage.setItem('token', JSON.stringify(data.token));
        dispatch(login(data));
      }
      data ? navigate('/calander') : navigate('/');

    } catch (err) {
      if(err.response.status === 401) {
        setErrors('שם משתמש או סיסמא לא נכונים');
      }
      console.log(err.response.status);
    }
  }

  return (
    <Container>
      <Title text="התחברות" />
      <img  src={logo} />
      <Form action=''>
        {errors && <Error>{errors}</Error>}
        <Div>
          <CustomInput type="text" placeHolder='שם משתמש' required={true} name='userName' onChange={(e) => handleChange(e)} />
          <CustomInput type="password" placeHolder="סיסמא" required={true} name="password" onKeyDown={(e) => {if(e.key === 'Enter') handleSignIn()}} onChange={(e) => handleChange(e)} />
        </Div>
        <Button onClick={() => handleSignIn()}>כניסה</Button>
        <Button onClick={() => navigate('/register')}>הרשמה</Button>
        {isSubmit && Spinner}

      </Form>
    </Container>
  )
}

export default SignIn;


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
  margin-right: 10px;
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


