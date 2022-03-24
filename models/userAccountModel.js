const mongoose = require('mongoose');

const userAccountSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        accountName: {
            type: String,
            trim: true,
            required: true
        },
        accountCurrency: {
            type: String,
            trim: true,
            required: [true, 'Account Currency is required']
        },
        accountAmount: {
            type: Number,
            trim: true,
            default: 0
        },
        accountDescription: {
            type: String,
            trim: true, 
            maxlength: [256, 'Description should have max 256 characters'],
        },
        accountStat: {
            type: String,
            enum: ['active', 'passive'],
            default: 'active'
        },
        accountCreated: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);


const Account = mongoose.model('Account', userAccountSchema);

module.exports = {
    Account
};