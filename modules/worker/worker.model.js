const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    thirdName: { type: String, required: true },
    to: { type:String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    clicks: { type: Number, default: 0 },
    owner: { type: Types.ObjectId, ref: 'User'}
})  

module.exports = model('Worker', schema);
