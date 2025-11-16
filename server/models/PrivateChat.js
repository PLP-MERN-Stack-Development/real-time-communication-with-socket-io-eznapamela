export class PrivateChat {
  constructor(user1Id, user2Id) {
    this.id = `private_${[user1Id, user2Id].sort().join('_')}`;
    this.participants = [user1Id, user2Id];
    this.messages = [];
    this.createdAt = new Date();
    this.lastActivity = new Date();
  }
}