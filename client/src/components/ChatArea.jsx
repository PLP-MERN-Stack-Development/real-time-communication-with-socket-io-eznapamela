import React, { useEffect, useRef } from 'react';

const ChatArea = ({ messages, currentUser, typingUsers }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUsers]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
            {currentUser?.avatar}
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">{currentUser?.name}</h2>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.user.id === currentUser?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`message-bubble px-4 py-3 rounded-2xl ${
                  message.user.id === currentUser?.id ? 'own' : 'other'
                }`}
              >
                {message.user.id !== currentUser?.id && (
                  <div className="font-semibold text-xs mb-1 opacity-70">
                    {message.user.name}
                  </div>
                )}
                <div className="text-sm">{message.text}</div>
                <div className={`text-xs mt-1 ${
                  message.user.id === currentUser?.id ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicators */}
          {typingUsers.length > 0 && (
            <div className="flex justify-start">
              <div className="message-bubble other px-4 py-3">
                <div className="flex space-x-1 items-center">
                  <span className="text-xs text-gray-500 mr-2">{typingUsers[0]} is typing</span>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatArea;