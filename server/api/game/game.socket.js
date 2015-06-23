/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Game = require('./game.model');

var _ = require('lodash');
var mongoose = require('mongoose');

var rooms = {};

function joinRoom (socket, user) {
  var roomId = user.gameId;

  if (!user.userId) {
    _.defaults(user, {
      userId: new mongoose.Types.ObjectId(),
      userName: 'Anonymous'
    });
  }

  var room = rooms[roomId] = rooms[roomId] || { users: [] };

  var existing = _.find(room.users, 'userId', user.userId);

  if (!existing) {
    room.users.push(user);
  }

  socket.user = user;
  socket.join(roomId, function () {
    socket.emit('room:users', room.users);
    socket.broadcast.to(roomId).emit('room:users', room.users);
  });
}

function leaveRoom (socket) {
  var roomId = socket.user && socket.user.gameId;
  var room = rooms[roomId];

  if (room) {
    room.users = _.without(room.users, socket.user);

    if (room.users.length === 0) {
      rooms[roomId] = undefined;
    }
  }
  socket.leave(roomId, function () {
    socket.broadcast.to(roomId).emit('room:users', room && room.users);
  });
}

exports.register = function (socket) {
  Game.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Game.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
  // room functionality
  socket.on('room:join', function (user) {
    joinRoom(socket, user);
  });
  socket.on('room:leave', function () {
    leaveRoom(socket);
  });
  socket.on('disconnect', function () {
    leaveRoom(socket);
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
