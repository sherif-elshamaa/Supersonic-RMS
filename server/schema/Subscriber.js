const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriberSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String},
  creditCardInfo: { type: String },
  accountBalance: {type: Schema.Types.Decimal128, default: 0}
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
