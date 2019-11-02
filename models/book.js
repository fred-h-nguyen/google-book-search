const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  googleId:{type:String},
  title: { type: String, required: true },
  authors: { type: Array, required: true },
  description: String,
  image: String,
  link:String
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
