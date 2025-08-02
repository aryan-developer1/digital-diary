const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  mood: {
    type:String,
    enum: ["SAD", "HAPPY", "WORST", "BEST", "ROMANTIC"],
    required: true,
  },
  content: {
    type: String,
  },
  user: {
    type: String,
  },
});

module.exports = mongoose.model("Diary", bookSchema);
