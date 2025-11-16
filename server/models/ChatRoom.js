export class ChatRoom {
  constructor(name, description = '') {
    this.id = Date.now().toString();
    this.name = name;
    this.description = description;
    this.createdAt = new Date();
    this.users = [];
    this.messages = [];
  }
}