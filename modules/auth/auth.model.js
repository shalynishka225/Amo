const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  worker: {
    type: Types.ObjectId,
    ref: "Worker",
  },
});

module.exports = model("User", schema, "User");
