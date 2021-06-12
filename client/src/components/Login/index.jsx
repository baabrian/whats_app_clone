import React, { useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { v4 as uuidV4 } from 'uuid';
import './styles.css';

export const Login = ({ onIdSubmit }) => {
  const idRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    onIdSubmit(idRef.current.value);
  };

  const createNewId = () => {
    onIdSubmit(uuidV4());
  };

  return (
    <Container className='align-items-center d-flex login__container'>
      <Form onSubmit={handleSubmit} className='w-100'>
        <Form.Group>
          <Form.Label>Enter Your Id</Form.Label>
          <Form.Control type='text' ref={idRef} required />
        </Form.Group>
        <Button type='submit' className='mr-3'>
          Login
        </Button>
        <Button onClick={createNewId} variant='secondary'>
          Create a new id
        </Button>
      </Form>
    </Container>
  );
};
