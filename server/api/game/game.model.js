'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  active: Boolean,
  created_at: Date,
  created_by: { type: Schema.ObjectId, ref: 'User' },
  gm: { type: Schema.ObjectId, ref: 'User' },
  info: String,
  modified_at: Date,
  locked: Boolean,
  name: String,
  players: [ { type: Schema.ObjectId, ref: 'User' } ]
});

module.exports = mongoose.model('Game', GameSchema);
