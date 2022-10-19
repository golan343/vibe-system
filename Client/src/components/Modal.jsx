import React  from 'react';
import ReactDOM from 'react-dom';
import { Button, Div } from '../styles';
import styled from 'styled-components';

const Modal = ({isOpen, onClose, children}) => {
if(!isOpen) return null;
return ReactDOM.createPortal(
    
    <ModalContainer>
        <ModalDiv>
            {children}
        </ModalDiv>
        {/* <ExitButton onClick={onClose}>יציאה</ExitButton> */}
        
    </ModalContainer>
    
    ,document.body
)


}

export default Modal;

const ExitButton = styled(Button)`
    top: 15%;
`;

const ModalDiv = styled(Div)`
    border: none;
    min-width: 85%;
    background-color: #fff;
    /* color: #fff; */
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: none;
    /* font-size: 2rem; */
    margin-top: 0;
    text-align: center;
`;

const ModalContainer = styled(Div)`
    width: 90%;
    background-color: rgba(255, 255, 255, 0.9);
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    z-index: 999;
    padding: 40px 20px 20px 20px;
    /* border: 1px solid red; */
    margin-top: 5%;
    box-shadow: none;
    border: none;
`;