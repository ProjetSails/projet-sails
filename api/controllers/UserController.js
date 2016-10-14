/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    me: function (req, res) {
        return res.send(req.user);
    },

    destroy: function (req, res) {
        User.destroy({ id: req.param('id') })
            .exec(function (err, user) {
                if (!user) {
                    return res.notFound('Could not find User, sorry.');
                }

                Log.destroy({ user: req.param('id') })
                    .exec(function (err) {
                        if (err) { return res.serverError(err); }
                    });

                Log.create({ user: req.user, device: null, texte: 'L\'Utilisateur ' + req.user.username + ' a supprime ' + user['username'] })
                    .exec(function (err, records) {
                        if (err) { return res.serverError(err); }
                    });
                return res.ok();
            });
    },

    update: function (req, res) {
        User.update({ id: req.param('id') }, req.allParams())
            .exec(function (err, updated) {
                if (err) { return res.serverError(err); }
                Log.create({ user: req.user, device: null, texte: 'L\'Utilisateur ' + req.user.username + ' a modifie ses informations' })
                    .exec(function (err, records) {
                        if (err) { return res.serverError(err); }
                        return res.json(req.user);
                    });
            });
    }
};

