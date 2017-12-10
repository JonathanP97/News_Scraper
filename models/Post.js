var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
  	type: String,
  	trim: true,
  	required: "post needs a title!" 
  },
  link: {
    type: String, 
    trim: true
  },
  author: {
  	type: String,
    trim: true
  },
  date: {
  	type: Date,
  	default: Date.now
  },
  sub: {
    type: String,
    trim: true
  },
  comments: [{
  	type: Schema.Types.ObjectId,
  	ref: "Comment"
  }] 
});
var Post = mongoose.model("Post", PostSchema);
module.exports = Post;