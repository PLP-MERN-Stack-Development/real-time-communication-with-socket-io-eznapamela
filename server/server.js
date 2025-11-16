import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { User } from './models/User.js';
import { ChatRoom } from './models/ChatRoom.js';

const app = express();
const server = createServer(app);

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));

app.use(express.json());

// Mock database
const users = new Map();
const chatRooms = new Map();
const messages = new Map();
const onlineUsers = new Map();

// Initialize default chat rooms
const defaultRooms = [
  new ChatRoom('general', 'General Discussion'),
  new ChatRoom('random', 'Random Chat'),
  new ChatRoom('help', 'Help & Support')
];

defaultRooms.forEach(room => {
  chatRooms.set(room.id, room);
});

// Auth routes
app.post('/api/register', (req, res) => {
  const { email, password, name } = req.body;
  
  if (users.has(email)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  const user = new User(email, password, name);
  users.set(email, user);
  
  res.json({ 
    success: true, 
    user: { 
      id: user.id, 
      email: user.email, 
      name: user.name, 
      avatar: user.avatar 
    } 
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.get(email);
  
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  user.isOnline = true;
  user.lastSeen = new Date();
  
  res.json({ 
    success: true, 
    user: { 
      id: user.id, 
      email: user.email, 
      name: user.name, 
      avatar: user.avatar 
    } 
  });
});

app.get('/api/chatrooms', (req, res) => {
  res.json(Array.from(chatRooms.values()));
});

app.get('/api/users', (req, res) => {
  res.json(Array.from(users.values()).map(user => ({
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    isOnline: user.isOnline,
    lastSeen: user.lastSeen
  })));
});

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  socket.on('user_authenticated', (userData) => {
    onlineUsers.set(socket.id, userData);
    
    // Join user to default room
    socket.join('general');
    
    // Notify others
    socket.broadcast.emit('user_online', userData);
    
    // Send initial data
    socket.emit('initial_data', {
      users: Array.from(users.values()).map(user => ({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        isOnline: user.isOnline,
        lastSeen: user.lastSeen
      })),
      chatRooms: Array.from(chatRooms.values()),
      messages: Array.from(messages.values()).filter(msg => 
        msg.roomId === 'general'
      ).slice(-50) // Last 50 messages
    });
  });

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    socket.emit('room_joined', roomId);
  });

  socket.on('send_message', (messageData) => {
    const user = onlineUsers.get(socket.id);
    if (user && messageData.text.trim()) {
      const message = {
        id: Date.now().toString(),
        text: messageData.text.trim(),
        user: user,
        roomId: messageData.roomId || 'general',
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      
      // Store message
      if (!messages.has(message.roomId)) {
        messages.set(message.roomId, []);
      }
      messages.get(message.roomId).push(message);
      
      // Broadcast to room
      io.to(message.roomId).emit('receive_message', message);
    }
  });

  socket.on('typing_start', (roomId = 'general') => {
    const user = onlineUsers.get(socket.id);
    if (user) {
      socket.to(roomId).broadcast.emit('user_typing', {
        userName: user.name,
        userId: user.id,
        roomId: roomId
      });
    }
  });

  socket.on('typing_stop', (roomId = 'general') => {
    const user = onlineUsers.get(socket.id);
    if (user) {
      socket.to(roomId).broadcast.emit('user_stopped_typing', user.id);
    }
  });

  socket.on('disconnect', () => {
    const user = onlineUsers.get(socket.id);
    if (user) {
      onlineUsers.delete(socket.id);
      
      // Update user status
      const userObj = users.get(user.email);
      if (userObj) {
        userObj.isOnline = false;
        userObj.lastSeen = new Date();
      }
      
      socket.broadcast.emit('user_offline', user.id);
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Socket.io ready for real-time connections`);
})