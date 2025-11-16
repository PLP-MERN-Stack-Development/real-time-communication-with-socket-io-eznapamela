import React from 'react';

const PrivateChatList = ({ privateChats, users, onSelectChat, currentUser, onClose }) => {
  const getChatParticipant = (chat) => {
    const participantId = chat.participants.find(id => id !== currentUser.id);
    return users.find(user => user.id === participantId);
  };

  const getLastMessage = (chat) => {
    return chat.messages[chat.messages.length - 1];
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Private Messages</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {privateChats.map((chat) => {
          const participant = getChatParticipant(chat);
          const lastMessage = getLastMessage(chat);
          
          return (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat)}
              className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  {participant?.avatar || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {participant?.name || 'Unknown User'}
                  </h3>
                  {lastMessage && (
                    <p className="text-sm text-gray-500 truncate">
                      {lastMessage.text}
                    </p>
                  )}
                  <div className="flex items-center mt-1 text-xs text-gray-400">
                    <div className={`w-2 h-2 rounded-full mr-2 ${participant?.isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                    {participant?.isOnline ? 'Online' : `Last seen ${participant?.lastSeen}`}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {privateChats.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No private messages yet. Start a conversation by clicking on a user.
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivateChatList;