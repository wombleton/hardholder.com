'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  active: Boolean,
  created_at: Date,
  created_by: String,
  modified_at: Date,
  info: String,
  name: String
});

module.exports = mongoose.model('Game', GameSchema);
