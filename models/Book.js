const mongoose = require('mongoose');
const Joi = require('joi');
const bookSchema = new mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  
  ISBN:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  user:{
    type:mongoose.Types.ObjectId,
    ref:'user'
  }
});
 


const Book = mongoose.model('book',bookSchema);


function validateInput(book){

	const schema={
		name:Joi.string().min(3).required(),
		author:Joi.string().min(3).required(),
		ISBN:Joi.string().min(3).required(),
    price:Joi.number().min(0).required(),
    
	};

	return Joi.validate(book,schema);
}

module.exports.Book=Book;
module.exports.validate = validateInput;