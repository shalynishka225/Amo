const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    from: { type: String, required: true },
    to: { type:String, required: true, unique: true },
    code: { type: String, required: true, unique:true },
    date: { type: Date, default: Date.now },
    clicks: { type: Number, default: 0 },
    owner: { type: Types.ObjectId, ref: 'User'},
    name: { type: String, required: true},
    description: { type: String, required: true },
    performance: { type: String, required: true },
    certificates: { type: Object, required: true },
    courses: { type: String, required: true },
    reviews: { type: String, required: true }

})  

module.exports = model('Worker', schema)
