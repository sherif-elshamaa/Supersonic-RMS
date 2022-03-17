const mongoose = require('mongoose');
const { Schema } = mongoose;

const invoiceSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    invoiceId: { type: String, required: true},
    invoiceUrl: { type: String, required: true },
    income: { type: Number, required: true },
    expenses: { type: Number, default: 2.04}
});

module.exports = mongoose.model('Invoice', invoiceSchema);
