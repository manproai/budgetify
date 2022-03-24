const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First name is required!']
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last name is required!']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!']
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
        required: true
    },
    dateOfBirth: {
        type: String,
        required: [true, 'Date of birth is required!']
    },
    country: {
        type: String,
        trim: true
    }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};
