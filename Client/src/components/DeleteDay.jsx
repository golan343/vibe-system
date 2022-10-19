import React from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BaseUrl } from '../config';
import { Button, Div, Label } from '../styles';

const DeleteDay = ({cookies, onClose}) => {
    const day = useSelector((state) => state.days.day);

    const handleDeleteDay =  async () => {
        try{
            const jwt = cookies['user'].token;
            await axios.delete(`${BaseUrl}/work/${day._id}`, {headers: {'Authorization' : `Bearer ${jwt}`}})
                .then(() => {
                    window.location.reload(false);
                });
            


        }catch(err){
            console.log(err);        
        }
    }
  return (
    <Div>
        <Label>בטוח שאתה רוצה למחוק את תאריך</Label>
        {new Date(day.startDate).toLocaleString()}
        <br></br>
        <Button onClick={() => handleDeleteDay()}>מחיקה</Button>
        <Button onClick={() => onClose()}>ביטול</Button>
    </Div>
    // <div>DeleteDay - {day._id}</div>
  );
}

export default DeleteDay;