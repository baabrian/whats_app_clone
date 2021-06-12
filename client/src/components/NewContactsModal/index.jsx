import React, { useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../../contexts/ContactsProvider';

export const NewContactsModal = ({ closeModal }) => {
  const idRef = useRef();
  const nameRef = useRef();
  const { createContact } = useContacts();

  const handleSubmit = (event) => {
    event.preventDefault();
    createContact(idRef.current.value, nameRef.current.value);
    closeModal();
  };
  return (
    <>
      <Modal.Header>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type='text' ref={idRef} required></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' ref={nameRef} required></Form.Control>
          </Form.Group>
          <Button className='mt-2' type='submit'>
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};
