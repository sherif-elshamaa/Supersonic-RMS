const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, required: true, refpath: 'onModel'},
  onModel: {type: String, required: true, enum: ['Subscriber', 'Admin']},
  password: {type: String, required: true},
  oldPassword: [],
  loginStatus: {type: Boolean},
  registerDate: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('User', userSchema);
