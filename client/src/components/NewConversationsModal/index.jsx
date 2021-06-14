import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../../contexts/ContactsProvider';
import { useConversations } from '../../contexts/ConversationsProvider';

export const NewConversationsModal = ({ closeModal }) => {
  const [selectedContactIds, setSelectedContactId] = useState([]);
  const { contacts } = useContacts();
  const { createConversations } = useConversations();

  const handleCheckBoxChange = (contactId) => {
    setSelectedContactId((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createConversations(selectedContactIds);
    closeModal();
  };

  const renderContacts = () => {
    return contacts.map((contact) => {
      return (
        <Form.Group controlId={contact.id} key={contact.id}>
          <Form.Check
            type='checkbox'
            value={selectedContactIds.includes(contact.id)}
            label={contact.name}
            onChange={() => handleCheckBoxChange(contact.id)}
          />
        </Form.Group>
      );
    });
  };

  return (
    <>
      <Modal.Header>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {renderContacts()}
          <Button className='mt-2' type='submit'>
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};
