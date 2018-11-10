//신고
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

var schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User'},
  Competition: { type: Schema.Types.ObjectId, ref: 'Competition'},
  answer: { type: Schema.Types.ObjectId, ref: 'Answer.content'},
  declare_reason: {type: String, trim: true}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});
var Declare = mongoose.model('Declare', schema);

module.exports = Declare;

//내가 저장 안하고 커밋했나..;;작동법 제대로 익히자