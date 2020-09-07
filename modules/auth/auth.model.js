const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    workers: [{
        type: Types.ObjectId,
        ref: 'Worker'
    }]
})

export const User = model('User', UserSchema, 'User');
