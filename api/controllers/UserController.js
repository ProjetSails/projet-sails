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

    delete: function (req, res) {
        User.findOne({ id: req.param('id') })
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

                User.destroy({ id: req.param('id') })
                    .exec(function (err) {
                        if (err) { return res.serverError(err); }
                    });
                return res.ok();
            });
    }
};

