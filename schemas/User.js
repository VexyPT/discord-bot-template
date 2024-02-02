const { Schema, model } = require("mongoose");

const userSet = new Schema({
  _id: { type: String },
  money: { type: Number, default: 0 }
});

module.exports = model("Users", userSet);