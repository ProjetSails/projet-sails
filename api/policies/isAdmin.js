/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: TODO: You might write a short summary of how this policy works and what it represents here.
 * @help        :: http://sailsjs.org/#!/documentation/concepts/Policies
 */
module.exports = function(req, res, next) {

    Group.findOne({
        user: req.user,
        id: req.param('group')
    }).exec(function(err, group){
        if (err) {
            return res.serverError(err);
        }
        if (!group) {
            return res.notFound('Impossible de trouver le groupe.');
        }
        if (res.group.isAdmin) {
            return next();
        }
        return res.forbidden('Vous n\'avez pas les permissions pour effectuer cette action.');
    });
};
