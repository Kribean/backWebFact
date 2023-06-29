const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  nickname: { type: String },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "pending",
  },
  userId: { type: String, required: true },
  createAndUpdateDate: {type:Date, default:Date()}
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
