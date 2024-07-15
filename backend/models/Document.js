const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  participants: [
    {
      userId: { type: Schema.Types.ObjectId, required: true },
      username: { type: String, required: true }
    }
  ],
  messages: [
    {
      sender: {
        userId: { type: Schema.Types.ObjectId, required: true },
        username: { type: String, required: true }
      },
      text: { type: String, required: true },
      timestamp: { type: Date, required: true }
    }
  ]
});

module.exports = mongoose.model('Document', documentSchema);
