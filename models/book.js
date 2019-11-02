const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  googleId:{type:String, required:true},
  title: { type: String, required: true },
  authors: { type: String, required: true },
  description: String,
  image: String,
  link:String
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
