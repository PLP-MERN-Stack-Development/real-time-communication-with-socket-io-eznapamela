QuickChat - Advanced Real-Time Chat Application
A comprehensive, feature-rich real-time chat application built with modern web technologies. Experience seamless communication with advanced features like private messaging, file sharing, read receipts, and message reactions.

https://img.shields.io/badge/QuickChat-Advanced%2520Chat-blue?style=for-the-badge&logo=chat&logoColor=white

🚀 Project Overview
QuickChat is a full-stack real-time messaging platform that provides a modern, responsive chat experience. Built with React, Node.js, and Socket.io, it offers both public chat rooms and private messaging with enterprise-grade features.

![alt text](<client/public/Screenshot 2025-11-16 132153.png>)
![alt text](<client/public/Screenshot 2025-11-16 132221.png>)

🛠 Tech Stack
Frontend:

⚛️ React 18 + Vite

🎨 Tailwind CSS

🔌 Socket.io Client

🖼️ File Upload Handling

Backend:

🟢 Node.js + Express

📡 Socket.io

📁 Multer (File Uploads)

🔄 Real-time WebSockets

📋 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v16 or higher)

npm or yarn

Modern web browser with WebSocket support

🛠 Setup Instructions
1. Clone and Setup Project Structure
bash
# Create project directory
mkdir quickchat-app
cd quickchat-app

# Create backend and frontend directories
mkdir server client
2. Backend Setup
Navigate to server directory:

bash
cd server
Create package.json:

json
{
  "name": "quickchat-server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node server.js",
    "start": "node server.js"
  },
  "dependencies": {
    "socket.io": "^4.7.5",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "multer": "^1.4.5-lts.1",
    "uuid": "^9.0.1"
  }
}
Install backend dependencies:

bash
npm install
Create uploads directory:

bash
mkdir uploads
Start the backend server:

bash
npm run dev
✅ Backend should now be running on: http://localhost:3001

3. Frontend Setup
Open a new terminal and navigate to client directory:

bash
cd ../client
Create package.json:

json
{
  "name": "quickchat-client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "socket.io-client": "^4.7.5"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.1",
    "vite": "^5.2.0"
  }
}
Install frontend dependencies:

bash
npm install
Configure Tailwind CSS:
Create tailwind.config.js:

javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
Create postcss.config.js:

javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
Start the frontend development server:

bash
npm run dev
✅ Frontend should now be running on: http://localhost:5173

4. Verify Installation
Backend Status: Visit http://localhost:3001/health - Should return {"status":"OK"}

Frontend Status: Visit http://localhost:5173 - Should show QuickChat login page

🎯 Features Implemented
🔐 Authentication & User Management
User Registration & Login - Secure account creation and authentication

Profile Management - User profiles with avatars and status

Online/Offline Status - Real-time user presence indicators

Last Seen Tracking - Track when users were last active

💬 Core Chat Features
Real-time Messaging - Instant message delivery using WebSockets

Multiple Chat Rooms - Public channels for different topics

General Discussion

Random Chat

Help & Support

Technology

Gaming

Message History - Persistent message storage and retrieval

Typing Indicators - See when others are typing in real-time

🔒 Private Messaging
One-on-One Chats - Secure private conversations between users

Private Chat Management - Easy access to ongoing private conversations

Cross-User Communication - Start chats with any registered user

📁 File & Media Sharing
Drag & Drop Upload - Intuitive file uploading interface

Image Preview - Automatic image preview and display

Document Sharing - Support for various file types (PDF, DOC, etc.)

File Size Management - 10MB file size limit with progress indicators

📊 Advanced Message Features
Read Receipts - See who has read your messages

Message Reactions - Express reactions with emojis (👍 ❤️ 😂 😮 😢 😠)

Reaction Counters - View how many users reacted to messages

Message Status - Delivery and read status indicators

🎨 User Interface & Experience
Responsive Design - Works seamlessly on desktop and mobile

Modern UI/UX - Clean, intuitive interface with smooth animations

Real-time Updates - Instant UI updates without page refresh

Connection Status - Visual indicators for server connection status

🔧 Technical Features
WebSocket Communication - Efficient real-time data transfer

Error Handling - Graceful error handling and user notifications

File Validation - Secure file type and size validation

Auto-reconnection - Automatic reconnection on network issues

🏗 Project Structure
text
quickchat-app/
├── server/                 # Backend Application
│   ├── models/            # Data models (User, Message, ChatRoom)
│   ├── uploads/           # File upload directory
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
│
└── client/                # Frontend Application
    ├── src/
    │   ├── components/
    │   │   ├── Auth/      # Login & Register components
    │   │   ├── Chat/      # Chat-related components
    │   │   └── Profile/   # User profile components
    │   ├── App.jsx        # Main application component
    │   └── main.jsx       # Application entry point
    ├── index.html         # HTML template
    └── package.json       # Frontend dependencies
🚀 Usage Guide
Getting Started
Register/Login: Create an account or login with existing credentials

Join a Room: Select from available public chat rooms

Start Chatting: Begin sending messages in real-time

Private Messaging
Access User List: Click on the users sidebar

Start Private Chat: Click on any user to start a private conversation

Manage Chats: Access your private chats from the private messages panel

File Sharing
Upload Files: Click the upload button or drag & drop files

Supported Types: Images, PDFs, Documents (up to 10MB)

View Files: Click on shared files to view or download

Advanced Features
Message Reactions: Hover over messages and click the reaction button

Read Receipts: See checkmarks indicating message read status

Typing Indicators: Watch for typing indicators in active conversations

🔧 API Endpoints
Authentication
POST /api/register - User registration

POST /api/login - User login

File Management
POST /api/upload - File upload endpoint

Data Retrieval
GET /api/chatrooms - Get available chat rooms

GET /api/users - Get registered users list

WebSocket Events
user_authenticated - User authentication

send_message - Send new message

receive_message - Receive new message

typing_start - Start typing indicator

typing_stop - Stop typing indicator

message_read - Mark message as read

react_to_message - Add reaction to message

🐛 Troubleshooting
Common Issues
Backend won't start:

Check if port 3001 is available

Verify all dependencies are installed

Check Node.js version (requires v16+)

Frontend connection issues:

Ensure backend is running on port 3001

Check browser console for WebSocket errors

Verify CORS configuration

File upload failures:

Check uploads directory permissions

Verify file size (max 10MB)

Ensure supported file types

Real-time features not working:

Check WebSocket connection status

Verify Socket.io versions match

Check network/firewall settings

Development Tips
Use browser developer tools to monitor WebSocket connections

Check server logs for backend errors

Test with multiple browser windows to simulate multiple users

🔮 Future Enhancements
Voice & Video Calling - WebRTC integration

Message Encryption - End-to-end encryption

Group Chat Creation - User-created group chats

Message Search - Advanced search functionality

Message Pinning - Pin important messages

User Roles - Moderator and admin roles

Message Editing - Edit sent messages

Dark Mode - Theme customization

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🤝 Contributing
Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

📞 Support
If you encounter any issues or have questions:

Check the troubleshooting section above

Review the browser console for errors

Verify both frontend and backend are running

Ensure all dependencies are properly installed

QuickChat - Bringing people together through seamless real-time communication. 🚀

Built with using React, Node.js, and Socket.io