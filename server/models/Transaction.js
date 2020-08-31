const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    income: [
        {
            description: {type: String, required: true},
            amount: {type: Number, required: true},
            date: {type: Date, required: true}
        }
    ],
    expense: [
        {
            description: {type: String, required: true},
            amount: {type: Number, required: true},
            date: {type: Date, required: true}
        }
    ]
});

module.exports = mongoose.model('Transaction', TransactionSchema);