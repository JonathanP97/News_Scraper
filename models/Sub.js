var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubSchema = new Schema({
  name: { 
  	type: String,
  	trim: true,
  	required: "Sub needs a title!" 
  },
  link: {
    type: String, 
    trim: true
  },
  posts: [{
  	type: Schema.Types.ObjectId,
  	ref: "Post"
  }] 
});
var Sub = mongoose.model("Sub", SubSchema);
module.exports = Sub;