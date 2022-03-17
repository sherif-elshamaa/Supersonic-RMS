const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactUsSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    replyState: { type: Boolean, required: true, default: false },
    reply:{ type: String},
    updateDate: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('ContactUs', ContactUsSchema);