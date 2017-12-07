var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  post_title: {
  	type: String,
  	trim: true,
  	unique: true,
  	required: "post needs a title!"
  },
  post_author: {
  	type: String, 
  	unique: true,
  	required: "post needs an author!"
  },
  post_date: {
  	type: Date,
  	default: Date.now
  },
  points: {
  	type: Number,
  	default: 0,
  },
  comments: [{
  	type: Schema.Types.ObjectId,
  	ref: "Comment"
  }] 
});
var Post = mongoose.model("Post", PostSchema);
module.exports = Post;