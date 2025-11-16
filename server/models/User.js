import { v4 as uuidv4 } from 'uuid';

export class User {
  constructor(email, password, name, avatar = '') {
    this.id = uuidv4();
    this.email = email;
    this.password = password; // In production, hash this!
    this.name = name;
    this.avatar = avatar || name.split(' ').map(n => n[0]).join('').toUpperCase();
    this.isOnline = false;
    this.lastSeen = new Date();
    this.createdAt = new Date();
  }
}