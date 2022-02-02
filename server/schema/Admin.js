const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
});

module.exports = mongoose.model('Admin', adminSchema);
