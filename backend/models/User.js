const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // Add chats array with structure for each chat
  chats: [{
    chatId: { type: String, required: true },
    lastMessage: { type: String, required: true },
    timestamp: { type: Date, required: true }
  }]
});

module.exports = mongoose.model('User', userSchema);