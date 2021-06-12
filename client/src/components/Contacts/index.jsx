import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useContacts } from '../../contexts/ContactsProvider';

export const Contacts = () => {
  const { contacts } = useContacts();

  const renderContacts = () => {
    return contacts.map((contact) => {
      return <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>;
    });
  };

  return <ListGroup variant='flush'>{renderContacts()}</ListGroup>;
}