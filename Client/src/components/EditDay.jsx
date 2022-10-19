import React, { useState } from 'react'
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { useSelector } from 'react-redux';


import { StartDateInput, EndDateInput, Box, FlexBox } from './InsertDay';
import { BaseUrl } from '../config';
import { Div, Input, Label, Select, Option, Button } from '../styles';
import Title from './Title';

const EditDay = ({statuses, cookies, onClose}) => {
  const oldDay = useSelector((state) => state.days.day);
  const [day, setDay] = useState(oldDay);
  const [startDate, setStartDate] = useState( new Date(day.startDate));
  const [endDate, setEndDate] = useState(new Date(day.endDate));

  const handleEditDay = async() => {
    try{
      const jwt = cookies['user'].token;
      const { data } = await axios.put(`${BaseUrl}/work/${day._id}`, day, {headers: {'Authorization' : `Bearer ${jwt}`}})
      if(data){
        window.location.reload(false);
      }
    }catch(err){
      console.log(err);
    }
  }

  const handleEndDate = (date) => {
    setDay(prevState => ({...prevState, endDate: date}));
  }
  const handleStartDate = (date) => {
    setDay(prevState => ({...prevState, startDate: date}));
  }

  return (
    <EditDiv>
      <Title text="עריכת יום עבודה" />
      <FlexBox>
        <Box>
          <Label>תחילת שעת עבודה</Label>
          <StartDateInput 
            placeholderText="לחץ לבחירת תחילת עבודה"
            selected={startDate}
            onChange={(date) => {setStartDate(date), handleStartDate(date)}}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={5}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            locale='he'
          />
        </Box>
        <Box>
          <Label>סיום שעת עבודה</Label>
          <EndDateInput 
            placeholderText="לחץ לבחירת סיום עבודה"
            onChange={(date) => {setEndDate(date), handleEndDate(date)}}
            selected={endDate}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={5}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            locale='he'
          />
        </Box>
        <Box>
          <Label>שם האירוע</Label>
          <Input type='text' placeholder={day.location} onChange={(e) => setDay(prevState => ({...prevState, location: e.target.value}))}  />
        </Box>
        <Box>
          <Label>סוג העבודה</Label>
          <Select defaultValue={day.status} onChange={(e) => setDay(prevState => ({...prevState, status: e.target.value}))}>
            {statuses.map(status => 
              <Option key={status._id}>{status.name}</Option>
            )}
          </Select>
        </Box>
        <Box>
          <Label>תשלום נדרש</Label>
          <Input type='number' placeholder={day.payment} onChange={(e) => setDay(prevState => ({...prevState, payment: e.target.value}))} />
        </Box>
        <Box>
            <Label>הערות נוספות</Label>
            <Input type='text' placeholder={day.comment} onChange={(e) => setDay(prevState => ({...prevState, comment: e.target.value}))} />
        </Box>
        
      </FlexBox>
      <Button onClick={() => handleEditDay()}>עדכון יום</Button>
      <Button onClick={() => onClose()}>ביטול</Button>
    </EditDiv>
  )
};

export default EditDay;

const EditDiv = styled(Div)`
  align-items: center;

`;


