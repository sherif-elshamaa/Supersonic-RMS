const mongoose = require('mongoose');
const { Schema } = mongoose;

const ticketSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  ticketType: { type: String, required: true },
  ticket: { type: String, required: true },
  ticketDate: { type: Date, default: Date.now() },
  status: { type: String, default: "open" },
  reply: { type: String }
});

module.exports = mongoose.model('Ticket', ticketSchema);