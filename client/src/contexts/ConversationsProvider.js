import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider'

const ConversationsContext = React.createContext();
export const useConversations = () => {
  return useContext(ConversationsContext);
};

export const ConversationsProvider = ({ id, children }) => {
  const [conversations, setConversations] = useLocalStorage('coversations', []);
  const [selectedConversationsIndex, setConversationsIndex] = useState(0);
  const { contacts } = useContacts();
  const socket = useSocket();

  console.log(socket)

  const createConversations = (recipients) => {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  };

  const formatRecipientsToString = (recipients) => {
    return recipients.map((recipient) => recipient.name).join(', ');
  };

  const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
    setConversations((prevConversations) => {
      let madeChange = false;
      const newMessage = { sender, text };
      const newConversations = prevConversations.map((conversation) => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true;
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }
        return conversation;
      });

      if (madeChange) {
        return newConversations;
      } else {
        return [...prevConversations, { recipients, messages: [newMessage] }];
      }
    });
  }, [setConversations]);

  useEffect(() => {
    if (socket === undefined) return;

    socket.on('recieve-message', addMessageToConversation)

    return () => socket.off('recieve-message')
  }, [socket, addMessageToConversation])

  const sendMessage = (recipients, text) => {
    socket.emit('send-message', { recipients, text });
    addMessageToConversation({ recipients, text, sender: id });
  };

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });

      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });

      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      return { ...message, senderName: name, fromMe };
    });

    const selected = index === selectedConversationsIndex;
    return { ...conversation, messages, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationsIndex],
    createConversations,
    selectedConversationIndex: setConversationsIndex,
    formatRecipientsToString,
    sendMessage,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};

const arrayEquality = (a, b) => {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((ele, index) => {
    return ele === b[index];
  });
};
