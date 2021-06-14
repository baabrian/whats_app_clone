import React from 'react';
import { SideBar } from '../SideBar';
import { OpenConversations } from '../OpenConversations';
import { useConversations } from '../../contexts/ConversationsProvider';
import './styles.css';

export const Dashboard = ({ id }) => {
  const { selectedConversation } = useConversations();
  return (
    <div className='d-flex dashboard__container'>
      <SideBar id={id} />
      {selectedConversation && <OpenConversations />}
    </div>
  );
};
