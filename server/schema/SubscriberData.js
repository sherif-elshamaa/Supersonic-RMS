const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriberDataSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, required: true},
  companyName: { type:String, required: true},
  businessType: { type:String, required: true},
  numberOfEmployees: { type:Number, required: true},
  businessNumber: { type:String, required: true},
  address: { type:String, required: true},
  country: { type:String, required: true},
  city: { type:String, required: true},
  zipCode: { type:String},
});

module.exports = mongoose.model('SubscriberData', subscriberDataSchema);