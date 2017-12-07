var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  text: {
    type: String,
    unique: true,
    required: "comment needs some text"
  },
  tags: String
});

var Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;