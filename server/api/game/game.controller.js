'use strict';

var _ = require('lodash');
var Game = require('./game.model');

function populateGame (query) {
  return query
    .populate('gm', 'name email')
    .populate('players', 'name email')
    .populate('created_by', 'name email');
}

// Get list of games
exports.index = function (req, res) {
  var promise = populateGame(Game.find()).exec();

  promise
    .then(function (games) {
      res.json(200, games);
    }, function (err) {
      handleError(res, err);
    });
};

// Get a single game
exports.show = function (req, res) {
  var promise = populateGame(Game.findById(req.params.id)).exec();

  promise
    .then(function (game) {
      if (!game) {
        res.send(404);
      } else {
        res.json(200, game);
      }
    }, function (err) {
      handleError(res, err);
    });
};

// Creates a new game in the DB.
exports.create = function (req, res) {
  var game = _.pick(req.body, 'name');
  var now = new Date();

  _.extend(game, {
    active: true,
    created_at: now,
    created_by: req.user._id,
    gm: req.user._id,
    modified_at: now,
    players: []
  });

  var promise = Game.create(game);

  promise
    .then(function (game) {
      res.json(201, game);
    }, function (err) {
      return handleError(res, err);
    }).end();
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
