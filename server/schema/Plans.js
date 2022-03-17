const mongoose = require('mongoose');
const { Schema } = mongoose;

const plansSchema = new Schema({
    type: { type: String, required: true },
    date: {type: Date, default: Date.now()},
    price: {type: Number, required: true}
});

module.exports = mongoose.model('Plans', plansSchema);