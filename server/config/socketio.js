/**
 * Socket.io configuration
 */

'use strict';

require('./environment');
var _ = require('lodash');
var mongoose = require('mongoose');

var games = {};

function joinRoom (socket, user) {
  var gameId = user.gameId;

  if (!user.userId) {
    _.defaults(user, {
      userId: new mongoose.Types.ObjectId(),
      userName: 'Anonymous'
    });
  }

  var game = games[gameId] = games[gameId] || { users: [] };

  var existing = _.find(game.users, 'userId', user.userId);

  if (!existing) {
    game.users.push(user);
  }

  socket.user = user;
  socket.join(gameId, function () {
    socket.emit('room::update', game);
    socket.broadcast.to(gameId).emit('room::update', game);
  });
}

function leaveRoom (socket) {
  var gameId = socket.user && socket.user.gameId;
  var game = games[gameId];

  if (game) {
    game.users = _.without(game.users, socket.user);

    if (game.users.length === 0) {
      games[gameId] = undefined;
    }
  }
  socket.leave(gameId, function () {
    socket.broadcast.to(gameId).emit('room::update', game);
  });
}

// When the user disconnects.. perform this
function onDisconnect (socket) {
  leaveRoom(socket);
}

// When the user connects.. perform this
function onConnect (socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    //console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/game/game.socket').register(socket);
  require('../api/thing/thing.socket').register(socket);

  // room functionality
  socket.on('room::join', function (user) {
    joinRoom(socket, user);
  });
  socket.on('room::leave', function () {
    leaveRoom(socket);
  });
}

module.exports = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    onConnect(socket);
    console.info('[%s] CONNECTED', socket.address);
  });
};
