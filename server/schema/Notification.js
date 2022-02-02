const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, required: true},
  offers: { type: Boolean, required: true, default: true},
  subscriptions: { type: Boolean, required: true, default: true},
  profileUpdate: { type: Boolean, required: true, default: true},
  smsNotification: {type: String, required: true, default: "push-everything"},
  updateDate: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Notification', notificationSchema);