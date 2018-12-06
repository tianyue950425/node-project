var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var obj = {
	title:String,
	content:String,
	createDate:Date,
	author:String,
	filepath:Array
}

var model = mongoose.model('article',new Schema(obj));
//集合名articles

module.exports = model;
