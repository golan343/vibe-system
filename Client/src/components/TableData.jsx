import React from 'react';
import styled from 'styled-components';
import { break1, Button, Input } from '../styles';
import { ExportTableToExcel } from './ExportTableToExcel';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Modal from './Modal';
import { getDay } from '../redux/features/daysSlice';
import EditDay from './EditDay';
import DeleteDay from './DeleteDay';
import InsertDay from './InsertDay';





const TableData = ({data, auth, statuses, cookies}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const onChangeCheck = (day) => {
    if(day._id === isChecked._id) {
      setIsChecked({});
      return;
    }
    setIsChecked(day);
  }

  const edit = (day) => {
    setIsOpen(true);
    setModalType(<EditDay statuses={statuses} cookies={cookies} onClose={() => setIsOpen(false)} />);
    dispatch(getDay(day));
  }
  const deleteDay = (day) => {
    dispatch(getDay(day));
    setIsOpen(true);
    setModalType(<DeleteDay cookies={cookies} onClose={() => setIsOpen(false)} />);
  }

  const insertDay = () => {
    setIsOpen(true);
    setModalType(
      <InsertDay statuses={statuses} cookies={cookies} onClose={() => setIsOpen(false)} />);
  }
    
    return (
        <> 
        <ExportTableToExcel 
          fileName={`${auth?.user?.firstName + ' ' + auth?.user?.lastName} - דוח עבודה חודש ${new Date(data[0]?.startDate).toLocaleString("he", {month: "long"})}`} 
        />
        <Button
          onClick={() => insertDay()}
          disabled={isChecked._id}
        > 
          הוספת יום חדש
        </Button>

        <Button 
          disabled={!isChecked._id}
          onClick={(e) => edit(isChecked)}
        >
          עריכת יום
        </Button>
        <Button 
          disabled={!isChecked._id}
          onClick={(e) => deleteDay(isChecked)}
        >
          מחיקת יום
        </Button>
        {isOpen ? (
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            children={modalType}
          />
        ) : null}

        <Table id='table-to-xlsx'>
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th><h2> {auth?.user?.firstName + " " + auth?.user?.lastName}</h2></Th>
              <Th><h2>דוח עבודה</h2> </Th>
            </Tr>
            <Tr></Tr>
            <Tr>
              <Th>שם האירוע</Th>
              <Th>התחלת עבודה</Th>
              <Th>סיום עבודה</Th>
              <Th>סוג העבודה</Th>
              <Th>תשלום נדרש</Th>
              <Th>הערות</Th>
              <Th>בחירת יום</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(day => (
              <Tr key={day._id}>
                <Td>
                  {day.location}
                </Td>
                <Td >
                  {new Date(day.startDate).toLocaleString()}
                </Td>
                <Td>
                  {new Date(day.endDate).toLocaleString()}
                </Td>
                <Td>
                  {day.status}
                </Td>
                <Td>
                  {day.payment}
                </Td>
                <Td>
                  {day.comment? day.comment : 'ללא הערות'}
                </Td>
                <Td>
                  <CheckBox 
                    type="checkbox"
                    onChange={(e) => onChangeCheck(day)}
                    checked={isChecked._id === day._id ? true : false}
                  />
                </Td>
              </Tr>
            ))}
          
          </Tbody>

        </Table>
        </>
        
    )
}


export default TableData;


const Table = styled.table`
  /* border: 1px solid black; */
  min-width: 100%;
  margin: auto;
  margin-top: 15px;
  direction: rtl;
  /* white-space: nowrap; */
  border-collapse: collapse;
  /* border: none; */
  background-color: white;
  border-radius: 15px;
  box-shadow: 2px 4px 5px rgba(0, 0, 0, .5);


  ${break1} {
    border-radius: 15px;
    display: block;
    thead, tbody, th, td, tr {
      display: block;
    }

  }

`;

const Th = styled.th`
  /* border: 1px solid #000; */
  font-weight: bolder;
  background-color: #f5f5f5;
  /* color: #fff; */
  padding: 8px;
  font-size: larger;
`;

const Td = styled.td`
  padding: 8px;
  border: none;
/* width: calc(100% / 6); */

  ${break1} {
    border: none;
    border-bottom: 1px solid #000;
    position: relative;
    padding-right: 50%;
    :nth-of-type(7) {
      border-bottom: none;
    }

    :before {
      position: absolute;
      top: 0;
      right: 6px;
      width: 45%;
      padding-right: 10px;
      white-space: nowrap;
      font-weight: bolder;
      padding-top: 4px;
    }

    :nth-of-type(2):before { 
      content: "התחלת עבודה";
    }
    :nth-of-type(3):before { 
      content: "סיום עבודה";
    }
    :nth-of-type(1):before { 
      content: "שם האירוע";
    }
    :nth-of-type(4):before { 
      content: "סוג העבודה";
    }
    :nth-of-type(5):before { 
      content: "תשלום נדרש";
    }
    :nth-of-type(6):before { 
      content: "הערות";
    }
    :nth-of-type(7):before { 
      content: "בחירת יום";
    }
  }
`;

const Tbody = styled.tbody`
`;

const Thead = styled.thead`
  tr {
    :nth-of-type(1) {
    color: red;
    position: absolute;
      top: -9999px;
      left: -9999px;
    }
  }

  ${break1}{
    tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    };
  }

`;

const Tr = styled.tr`
background: #F8F8F8;
border-radius: 15px;

:nth-of-type(odd) {
  background-color: #a3a3a3;
}

  ${break1} {
    border-bottom: 2px solid rgba(0, 0, 0, .7);
    margin-bottom: 1px;
  }

`;
const CheckBox = styled.input`
  border: 1px solid black;
`;

// const ExcelButton = styled(ReactHTMLTableToExcel)`
//     width: 170px;
//     margin: 10px;
//     background-color: #fff;
//     border: 1px solid rgba(0, 0, 0, .4);
//     height: 25px;
//     border-radius: 10px;
//     box-shadow: 4px 5px 5px #808080;
//     font-weight: 600;
//     font-size: 15px;
// `;