var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
  	type: String,
  	trim: true,
  	unique: true,
  	required: "post needs a title!" 
  },
  link: {
    type: String, 
    trim: true,
    unique: true
  },
  author: {
  	type: String, 
  	unique: true, 
    trim: true
  },
  date: {
  	type: Date,
  	default: Date.now
  },
  comments: [{
  	type: Schema.Types.ObjectId,
  	ref: "Comment"
  }] 
});
var Post = mongoose.model("Post", PostSchema);
module.exports = Post;