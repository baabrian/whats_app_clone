import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useConversations } from '../../contexts/ConversationsProvider';

export const Conversations = () => {
  const { conversations, selectedConversationIndex, formatRecipientsToString } =
    useConversations();

  const renderConversationsList = () => {
    return conversations.map((conversation, index) => {
      return (
        <ListGroup.Item
          key={index}
          action
          active={conversation.selected}
          onClick={() => selectedConversationIndex(index)}
        >
          {formatRecipientsToString(conversation.recipients)}
        </ListGroup.Item>
      );
    });
  };
  return <ListGroup variant='flush'>{renderConversationsList()}</ListGroup>;
};
