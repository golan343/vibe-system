import React, { useState } from 'react'
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import axios from 'axios';


import { BaseUrl } from '../config';
import { Div, Input, Label, Select, Option, Button } from '../styles';
import Title from './Title';

const InsertDay = ({statuses, cookies, onClose}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [day, setDay] = useState({});

    const handleStartDate = (date) => {
        const userId = cookies['user'].user._id;
        setDay(prevState => ({...prevState, startDate: date}));
        setDay(prevState => ({...prevState, userId: userId }));
    }

    const handleEndDate = (date) => {
        setDay(prevState => ({...prevState, endDate: date}));
    }

    const handleInsertDay = async() => {
        try{
            const jwt = cookies['user'].token;
            const {data} = await axios.post(`${BaseUrl}/work/`, day, { headers: {'Authorization' : `Bearer ${jwt}` }});
            if(data){
              window.location.reload(false);
            }
        }catch(err){
          console.log(err.message);
        }
      }
    
  return (
    <Div>
        <Title text="הכנסת יום עבודה חדש"/>
        <FlexBox>  
        <Box> 
            <Label>תחילת שעת עבודה</Label>
            <StartDateInput 
                placeholderText="לחץ לבחירת תחילת עבודה"
                onChange={(date) => {setStartDate(date), handleStartDate(date)}}
                selected={startDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                locale='he'
                onKeyDown={(e) => e.preventDefault()}
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
                onKeyDown={(e) => e.preventDefault()}
            />
        </Box>
        <Box>
            <Label>שם האירוע</Label>
            <Input type='text' placeholder="שם האירוע" onChange={(e) => setDay(prevState => ({...prevState, location: e.target.value}))}  />
        </Box>
        <Box>
            <Label>סוג העבודה</Label>
            <Select defaultValue={'DEFAULT'} onChange={(e) => setDay(prevState => ({...prevState, status: e.target.value}))}>
                <Option disabled value='DEFAULT'>סוג העבודה</Option>
                {statuses.map(status => 
                    <Option key={status._id}>{status.name}</Option>
                )}
            </Select>
        </Box>
        <Box>
            <Label>תשלום נדרש</Label>
            <Input type='text' placeholder='תשלום נדרש' onChange={(e) => setDay(prevState => ({...prevState, payment: e.target.value}))} />
        </Box>
        <Box>
            <Label>הערות נוספות</Label>
            <Input type='text' placeholder='הערות' onChange={(e) => setDay(prevState => ({...prevState, comment: e.target.value}))} />
        </Box>
        

        </FlexBox>
        <Button onClick={()=> handleInsertDay()}>הוספת תאריך</Button>
        <Button onClick={() => onClose()}>ביטול</Button>
        
        
    </Div>
  )
}

export default InsertDay;

const FlexBox = styled.div`
    margin: auto;
    width: 95%;
    display: flex;
    flex-flow: row wrap;
    max-width: 750px;
`;


const StartDateInput = styled(DatePicker)`
    margin: 5px;
    height: 25px;
    width: 200px ;
    font-weight: 600;
    font-size: 15px;
    flex-grow: 1;
    flex-basis: 200px;
  
`;

const EndDateInput = styled(DatePicker)`
    margin: 5px;
    height: 25px;
    width: 200px ;
    font-weight: 600;
    font-size: 15px;
    flex-grow: 1;
    flex-basis: 200px;
`;

const Box = styled.div`
    /* border: 1px solid rgba(0, 0, 0, .2); */
    border-radius: 15px;
    flex: 1 auto;
    margin: 2px;

`;
export {StartDateInput, EndDateInput, Box, FlexBox};