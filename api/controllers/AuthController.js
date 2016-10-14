/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

function onPassportAuth(req, res, error, user, info)
{

  if (error) {
    return res.serverError(error);
  }
  if (!user) {
    return res.unauthorized(null, info && info.code, info && info.message);
  }

  return res.ok({
      token: SecurityService.createToken(user),
      user: user
    }
  )
}

module.exports = {

  signin : function(req, res) {
    passport.authenticate('local', onPassportAuth.bind(this, req, res))(req, res);
    },

  signup : function(req, res) {
    User
      .create(_.omit(req.allParams(), 'id'))
        .then(function (user) {
            Log.create({ user: user, device: null, texte: 'Utilisateur ' + user.username + ' créé' })
                .exec(function (err, records) {
                    if (err) { return res.serverError(err); }
                    return res.ok();
                });
        return {
          token: SecurityService.createToken(user),
          user: user
        }
      })
      .then(res.created)
        .catch(function (err) {
            Log.create({ user: user, device: null, texte: 'Utilisateur ' + user.username + ' non créé' })
                .exec(function (err, records) {
                    if (err) { return res.serverError(err); }
                    return res.ok();
                });
            res.serverError
        });
  },

  signout: function (req, res) {
      req.logout();
      
      Log.create({ user: req.user, device: null, texte: 'Utilisateur ' + req.user + ' deconnecte' })
          .exec(function (err, records) {
              if (err) { return res.serverError(err); }
              return res.ok();
          });
  }

};

