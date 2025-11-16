import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import ChatSidebar from './components/ChatSidebar';
import ChatArea from './components/ChatArea';
import MessageInput from './components/MessageInput';

const SOCKET_URL = 'http://localhost:3001';

// Sample users data
const sampleUsers = [
  { id: '1', name: 'John Johnson', status: 'online', avatar: 'JJ' },
  { id: '2', name: 'Michael Brown', status: 'online', avatar: 'MB' },
  { id: '3', name: 'William Jones', status: 'online', avatar: 'WJ' },
  { id: '4', name: 'Liam Stone', status: 'online', avatar: 'LS' },
  { id: '5', name: 'Noah Krisz', status: 'online', avatar: 'NK' },
  { id: '6', name: 'Oliver Bean', status: 'online', avatar: 'OB' },
  { id: '7', name: 'James Cook', status: 'online', avatar: 'JC' }
];

function App() {
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    // Set current user (in real app, this would come from authentication)
    const user = sampleUsers[0];
    setCurrentUser(user);

    // Join chat after a short delay
    setTimeout(() => {
      newSocket.emit('user_join', {
        name: user.name,
        avatar: user.avatar
      });
    }, 100);

    // Socket event listeners
    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    });

    newSocket.on('message_history', (history) => {
      setMessages(history);
    });

    newSocket.on('receive_message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('users_list', (usersList) => {
      setUsers(usersList);
    });

    newSocket.on('user_joined', (user) => {
      setUsers(prev => [...prev, user]);
    });

    newSocket.on('user_left', (userId) => {
      setUsers(prev => prev.filter(user => user.id !== userId));
    });

    newSocket.on('user_typing', (userName) => {
      setTypingUsers(prev => {
        if (!prev.includes(userName)) {
          return [...prev, userName];
        }
        return prev;
      });
    });

    newSocket.on('user_stopped_typing', () => {
      setTypingUsers(prev => prev.slice(1));
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = (text) => {
    if (socket && text.trim()) {
      socket.emit('send_message', {
        text: text.trim()
      });
    }
  };

  const handleTypingStart = () => {
    if (socket) {
      socket.emit('typing_start');
    }
  };

  const handleTypingStop = () => {
    if (socket) {
      socket.emit('typing_stop');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <ChatSidebar 
        users={users} 
        currentUser={currentUser}
        isConnected={isConnected}
      />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <ChatArea 
          messages={messages}
          currentUser={currentUser}
          typingUsers={typingUsers}
        />
        
        {/* Message Input */}
        <MessageInput 
          onSendMessage={sendMessage}
          onTypingStart={handleTypingStart}
          onTypingStop={handleTypingStop}
        />
      </div>
    </div>
  );
}

export default App;