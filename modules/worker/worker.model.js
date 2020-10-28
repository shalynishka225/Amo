const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  firstName: { type: String, default: '' },
  secondName: { type: String, default: '' },
  thirdName: { type: String, default: '' },
  about: { type: String, default: '' },
  date: { type: Date, default: Date.now },
  owner: { type: Types.ObjectId, ref: 'User' },
  checkTable: { type: Array, default: '' },
  avatar: { type: Object, default: '' },
  workPhoto: { type: Array, default: '' },
  certificates: { type: Array, default: '' },
  region: { type: String, default: '' },
  locality: { type: String, default: '' },
});

module.exports = model('Worker', schema, 'Worker');
