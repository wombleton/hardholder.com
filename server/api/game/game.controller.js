'use strict';

var _ = require('lodash');
var Game = require('./game.model');

// Get list of games
exports.index = function (req, res) {
  Game.find(function (err, games) {
    if (err) { return handleError(res, err); }
    return res.json(200, games);
  });
};

// Get a single game
exports.show = function (req, res) {
  Game.findById(req.params.id, function (err, game) {
    if (err) { return handleError(res, err); }
    if (!game) { return res.send(404); }
    return res.json(game);
  });
};

// Creates a new game in the DB.
exports.create = function (req, res) {
  var game = _.pick(req.body, 'name');
  var now = new Date();

  _.extend(game, {
    active: true,
    created_at: now,
    created_by: req.user.id,
    modified_at: now
  });

  Game.create(game, function (err, game) {
    if (err) { return handleError(res, err); }
    return res.json(201, game);
  });
};

// Updates an existing game in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Game.findById(req.params.id, function (err, game) {
    if (err) { return handleError(res, err); }
    if (!game) { return res.send(404); }
    var updated = _.merge(game, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, game);
    });
  });
};

// Deletes a game from the DB.
exports.destroy = function (req, res) {
  Game.findById(req.params.id, function (err, game) {
    if (err) { return handleError(res, err); }
    if (!game) { return res.send(404); }
    game.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError (res, err) {
  return res.send(500, err);
}
