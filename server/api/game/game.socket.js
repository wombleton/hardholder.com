/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Game = require('./game.model');

exports.register = function (socket) {
  Game.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Game.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
};

function onSave (socket, doc, cb) {
  var promise = Game.populate(doc, {
    path: 'created_by gm players',
    select: 'name email'
  });

  promise.then(function (game) {
    socket.emit('game:save', doc);
  });
}

function onRemove (socket, doc, cb) {
  socket.emit('game:remove', doc);
}
