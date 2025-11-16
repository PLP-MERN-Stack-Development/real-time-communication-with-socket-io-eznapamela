export class Message {
  constructor(text, userId, roomId = 'general', options = {}) {
    this.id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    this.text = text;
    this.userId = userId;
    this.roomId = roomId;
    this.timestamp = new Date();
    this.type = options.type || 'text';
    this.fileUrl = options.fileUrl || null;
    this.fileName = options.fileName || null;
    this.fileSize = options.fileSize || null;
    this.reactions = {};
    this.readBy = [userId]; // Message is read by sender initially
    this.isPrivate = options.isPrivate || false;
    this.recipientId = options.recipientId || null;
  }
}