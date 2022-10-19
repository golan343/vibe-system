import axios from 'axios';
import React, { useEffect, useState, forwardRef } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import  he  from 'date-fns/locale/he'
registerLocale('he', he);

import { getDays } from '../redux/features/daysSlice';
import { useFilteredByMonth } from '../hooks/useFilteredByMonth';
import { insertStatuses } from '../redux/features/statusSlice';
import { logout } from '../redux/features/userSlice';
import Title from '../components/Title';
import { BaseUrl } from '../config';
import InsertDay from '../components/InsertDay';
import TableData from '../components/TableData';
import {Div, Button} from  '../styles';


const Days = () => {
  const dispatch = useDispatch();
  const statuses = useSelector((state) => state.statuses.statuses);
  const auth = useSelector((state) => state.auth.auth);
  const days = useSelector((state) => state.days.days);
  const { onFiltersApply, filteredDays } = useFilteredByMonth(days);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user']);


  const fetchStatuses = async () => {
    try{
      const jwt = cookies['user'].token;
      const {data} = await axios.get(`${BaseUrl}/status/`, { headers: {'Authorization' : `Bearer ${jwt}` }});
      if(data){
        dispatch(insertStatuses(data));
      }
  
    }catch(err){
      console.log(err);
    }
  }

  const fetchDays = async() => {
    try{
      const user = cookies['user'].user;
      const jwt = cookies['user'].token;
      if(user){
        const {data} = await axios.get(`${BaseUrl}/work/${user._id}`, { headers: {'Authorization' : `Bearer ${jwt}` }});
        dispatch(getDays(data));
      }
      

    }catch(err){
      console.log(err.message);
    }
  }

  
  
  useEffect(() => {

    if(cookies['user'] === 'undefined'){
      return navigate('/');
    }else {
      fetchStatuses();
      fetchDays();
      onFiltersApply(new Date());
    }

    

  }, []);

  const FilterDate = forwardRef(({ onClick }, ref) => (
    <Button onClick={onClick} ref={ref}>
      סינון לפי חודש לחץ כאן
    </Button>
  ));

  const handleLogout = () => {
    console.log('test');
    setCookie('user', 'undefined');
    dispatch(logout());
    navigate('/');

  }

  return (
    <Container>
      <CustomDiv> 
        <P> שלום : <b>{auth?.user.firstName} {auth?.user.lastName} </b></P>
        <Button onClick={() => handleLogout()}>יציאה מהמערכת</Button>
        
      </CustomDiv>
      
      {/* <InsertDay statuses={statuses} cookies={cookies} /> */}
      
      <Div> 
        
        <Title text='רשימת ימי עבודה' />
        <DatePicker 
          dateFormat="MM/yyyy"
          onChange={(date) => onFiltersApply(date)}
          showMonthYearPicker
          locale='he'
          customInput={<FilterDate />}
          onKeyDown={(e) => e.preventDefault()}
        />
       
        {days && filteredDays && <TableData data={filteredDays} auth={auth} statuses={statuses} cookies={cookies}  />}
      </Div>
      
      
      </Container>
  )
}

export default Days;

const P = styled.p`
  direction: rtl;
  margin: 0;
`;


const Container = styled.div`
  margin-top: 20px;
  min-width: 95%;
  min-height: 100vh;
  /* border: 1px solid black; */
  text-align: center;

  
`;

const CustomDiv = styled(Div)`
  height: 80px;
`;
