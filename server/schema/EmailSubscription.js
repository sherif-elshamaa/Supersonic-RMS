const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmailSubscriptionSchema = new Schema({
    email: { type: String, required: true },
    updateDate: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('EmailSubscription', EmailSubscriptionSchema);