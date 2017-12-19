var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
  	type: String,
  	trim: true,
  	unique: true, 
  	required: "user needs username"
  },
  password: {
    type: String,
    required: "password please"
  },
  dateCreated: {
  	type: Date,
  	default: Date.now
  },
  comments: [{
  	type: Schema.Types.ObjectId,
  	ref: "Comment"
  }] 
});

var User = mongoose.model("User", UserSchema);
module.exports = User;