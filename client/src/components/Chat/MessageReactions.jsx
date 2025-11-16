import React, { useState } from 'react';

const MessageReactions = ({ message, currentUser, onReaction }) => {
  const [showPicker, setShowPicker] = useState(false);

  const reactions = [
    { emoji: '👍', label: 'like' },
    { emoji: '❤️', label: 'love' },
    { emoji: '😂', label: 'laugh' },
    { emoji: '😮', label: 'wow' },
    { emoji: '😢', label: 'sad' },
    { emoji: '😠', label: 'angry' }
  ];

  const handleReaction = (reaction) => {
    onReaction(message.id, reaction);
    setShowPicker(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600 text-xs"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {showPicker && (
        <div className="absolute bottom-full left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10 flex space-x-1">
          {reactions.map((reaction) => (
            <button
              key={reaction.label}
              onClick={() => handleReaction(reaction.label)}
              className="text-lg hover:scale-125 transition-transform"
              title={reaction.label}
            >
              {reaction.emoji}
            </button>
          ))}
        </div>
      )}

      {/* Display existing reactions */}
      {message.reactions && Object.keys(message.reactions).length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {Object.entries(message.reactions).map(([reaction, users]) => (
            <div
              key={reaction}
              className={`px-2 py-1 rounded-full text-xs flex items-center space-x-1 ${
                users.includes(currentUser.id) 
                  ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <span>{reactions.find(r => r.label === reaction)?.emoji}</span>
              <span>{users.length}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageReactions;