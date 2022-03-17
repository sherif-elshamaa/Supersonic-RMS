const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, required: true},
  stripeSubID: { type:String },
  planType: {type: String, required: true},
  price: { type: Number, required: true},
  startDate: { type: Date },
  customersID: { type:String },
  email: { type:String, required: true },
  invoiceUrl: { type:String },
  invoiceId: { type: String },
  status: { type: Boolean, required: true, default: false}
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
