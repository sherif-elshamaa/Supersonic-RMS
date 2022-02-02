const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactUsSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true },
    message: { type: String, required: true },
    updateDate: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('ContactUs', ContactUsSchema);