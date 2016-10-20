/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: TODO: You might write a short summary of how this policy works and what it represents here.
 * @help        :: http://sailsjs.org/#!/documentation/concepts/Policies
 */
var passport = require('passport');
module.exports = function (req, res, next) {
    var passport = require('passport');
    passport.authenticate('jwt', function (error, user, info) {
        if (error) return res.serverError(error);
        if (!user) {
            return res.unauthorized(null, info && info.code, info && info.message);
        }
        req.user = user;
        next();
    })(req, res);

    
    
    Device.findOne({
        id: req.param('id')
    }).exec(function (err, device) {
        if (err) {
            return res.serverError(err);
        }
        if (!device) {
            return res.notFound('Impossible de trouver le device.');
        }
        GroupUserRole.findOne({
            group: device.group,
            user: req.user['id']
        }).exec(function (err, groupuserrole) {
            if (err) {
                return res.serverError(err);
            }
            if (!groupuserrole) {
                return res.notFound('Impossible de trouver le r�le de l\'utilisateur.');
            }
            if (groupuserrole.isAdmin) {
                sails.log.debug("Good");
                return res.json('Le device a �t� supprim� avec succ�s');
            }

        });
    });
}
