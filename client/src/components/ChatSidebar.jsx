import React from 'react';

const ChatSidebar = ({ users, currentUser, isConnected }) => {
  return (
    <div className="bg-black sidebar w-80 flex flex-col">
      {/* Header */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-2">QuickChat</h1>
        <div className="flex items-center">
          <div className="user-avatar w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold mr-3">
            {currentUser?.avatar}
          </div>
          <div>
            <div className="text-white font-semibold">{currentUser?.name}</div>
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className="text-xs text-white opacity-80">
                {isConnected ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-6 pb-4">
        <div className="search-box rounded-xl px-4 py-3">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-white opacity-70 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search More..."
              className="w-full bg-transparent border-none outline-none text-white placeholder-white placeholder-opacity-70"
            />
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto px-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center p-3 rounded-xl mx-2 hover:bg-white hover:bg-opacity-10 cursor-pointer transition-all duration-200"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white font-semibold">
                {user.avatar}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-purple-600"></div>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="font-semibold text-white text-sm">{user.name}</h3>
              <p className="text-xs text-white opacity-70">{user.lastSeen}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;