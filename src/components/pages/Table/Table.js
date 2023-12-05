import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigator, useNavigate } from 'react-router-dom';
import { addTableRequest, getTableById } from '../../../redux/tablesRedux';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import styles from './Table.module.scss';
import NavbarC from '../../views/NavBarC/NavBarC';
import Footer from '../../views/Footer/Footer';
// import { addTableRequest } from '../../../redux/tablesRedux';

const Table = props => {
   const dispatch = useDispatch();
   const { id } = useParams();
   const navigate = useNavigate();
   const tableData = useSelector((state) => getTableById(state, id));
   const { register, handleSubmit: validate, formState: { errors }} = useForm();
   const [table, setTable ] = useState('');
   const [ people, setPeople ] = useState(tableData.peopleAmount);
   const [ maxPeople, setMaxPeople ] = useState(tableData.maxPeopleAmount);
   const [ status, setStatus ] = useState("Free");
   const [ bill, setBill ] = useState(tableData.bill); 
   const [ visible, setVisible ] = useState(status === 'Busy');

   const statusArray = ["Busy", "Free", "Reserved", "Cleaning"];

   console.log('people', people);

   const changePeople = (e) => {
      const inputValue = parseInt(e.target.value);
      if(!isNaN(e.target.value) && inputValue > 0 && inputValue <= maxPeople) {
         setPeople(e.target.value);
      } 
   }

   const handleStatus = (e) => {
      console.log('status', e.target.value);
      setStatus(e.target.value);
      if(e.target.value === 'Cleaning' || e.target.value === 'Free') {
         setPeople(0);
         setVisible(false);
      } else {
         setVisible(true)
      }
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(addTableRequest({ id, status, people, maxPeople, bill }));
      navigate('/')
   }

   const handleMaxPeople = (e) => {
      console.log(e.target.value);
      const inputValue = parseInt(e.target.value);
      if (inputValue >= 0 && inputValue <= 10) {
         setMaxPeople(inputValue); 
      }
      
   }

   const handleBill = (e) => {
      if (e.target.value >= 0) {
         setBill(e.target.value);
      }
   }

   return (
      <>
         <NavbarC />
         <h3>Title {tableData.id}</h3>
         <Form onSubmit={validate(handleSubmit)}>
            {/* First Input: Dropdown */}
            <Form.Group as={Row} controlId="formDropdown">
               <Form.Label column sm="2">
                  <strong>Status:</strong>
               </Form.Label>
               <Form.Control as="select" className={styles.input} onChange={handleStatus}>
                  {statusArray.map(status => (<option value={status}>{status}</option>))}
               </Form.Control>
            </Form.Group>
            {/* Second Input: Two Inputs in One Line */}
            <Form.Group as={Row} controlId="formTwoInputs">
               <Form.Label column sm="2">
                  <strong>People:</strong>
               </Form.Label>
               <Col sm="4" style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <Row>
                     <Col style={{ width: '40px', marginRight: 0, paddingRight: 0 }}>
                        <Form.Control 
                           {...register('people', { min: 0, max: maxPeople })}
                           type='number'
                           value={people} 
                           className={styles.smallInput} 
                           onChange={changePeople} 
                        />
                     </Col>
                     <Col className="d-flex align-items-center"  style={{ width: '20px', padding: 0 }}>
                        <span >/</span>
                     </Col>
                     <Col style={{ width: '40px', marginLeft: 0, paddingLeft: 0 }}>
                        <Form.Control 
                           // {...register('maxPeople', { min: 0, max: 10 })}
                           type='number'
                           value={maxPeople} 
                           className={styles.smallInput} 
                           onChange={handleMaxPeople} 
                           />
                     </Col>
                  </Row>
               </Col>
            </Form.Group>
            {visible && (
               <Form.Group>
                  <h2>Bill: </h2>
                  <Form.Control 
                     type='number'
                     value={bill}
                     onChange={handleBill}
                  >
                  </Form.Control>
               </Form.Group>
            )}
            <Button variant='primary' type='submit' onClick={handleSubmit}>Submit changes</Button>
         </Form>
         <Footer />
         {/* <form onSubmit={handleSubmit}>
            Table: <input type="text" value={table} onChange={e => setTable(e.target.value)} />
         </form> */}
      </>
   );
}

export default Table;