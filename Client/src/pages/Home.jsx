import React from 'react'
import { isExpired } from 'react-jwt'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';


import { logout, login } from '../redux/features/userSlice';
import Days from './Days';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import EditDay from '../components/EditDay';

const Home = () => {
  const auth = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['user']);
  
  useEffect(() => {
   
  }, []);



useEffect(() => {

  if(auth && cookies["user"] == "undefined") {

    setCookie('user', auth, {path: '/'});

  } else if (!auth && cookies["user"] != "undefined"){

    if(cookies['user'] && !isExpired(cookies['user'].token)){

      dispatch(login(cookies["user"]));

    }else{

      dispatch(logout()),
      setCookie('user', 'undefined');
      window.location.reload(false);
      
    }
    
  }

}, [auth]);

return(
  <BrowserRouter>
    <Routes>
      <Route path='/calander' element={<Days />} />
      <Route path ='/:_id' element={ <EditDay />} />
      <Route path='/' element={<SignIn />} />
      <Route path='/register' element={<SignUp />} />
    </Routes>

   </BrowserRouter>
);
}

export default Home;
