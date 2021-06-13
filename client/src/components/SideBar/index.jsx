import React, { useState } from 'react';
import { Tab, Nav, Button, Modal } from 'react-bootstrap';
import { Conversations } from '../Conversations';
import { NewConversationsModal } from '../NewConversationsModal';
import { NewContactsModal } from '../NewContactsModal';
import { Contacts } from '../Contacts';
import { useModal } from '../../hooks/useModal';
import './styles.css';

const CONVERSATIONS_KEY = 'conversations';
const CONTACTS_KEY = 'contacts';

export const SideBar = ({ id }) => {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const [isModalOpen, handleModalToggle] = useModal();
  const conversationsOpen = activeKey === CONVERSATIONS_KEY;

  return (
    <div className='d-flex flex-column side-bar__container'>
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant='tabs' className='justify-content-center'>
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className='border border-right overflow-auto flex-grow-1'>
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className='p-2 border-top border-right border small'>
          Your id: <span className='text-muted'>{id}</span>
        </div>
        <Button onClick={() => handleModalToggle()} className='rounded-0'>
          New {conversationsOpen ? 'Conversation' : 'Contact'}
        </Button>
        <Modal show={isModalOpen} onHide={handleModalToggle}>
          {conversationsOpen ? (
            <NewConversationsModal closeModal={handleModalToggle} />
          ) : (
            <NewContactsModal closeModal={handleModalToggle} />
          )}
        </Modal>
      </Tab.Container>
    </div>
  );
};
