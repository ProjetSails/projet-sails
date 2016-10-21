/**
 * GroupController
 *
 * @description :: Server-side logic for managing Groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    create: function (req, res) {
        Group.create({ name: req.param('name') }).exec(function (err, group) {
            if (err) { return res.serverError(err); }
            GroupUserRole.create({user: req.user['id'], group: group['id'], isAdmin: true}).exec(function (err, gur) {
                if (err) { return res.serverError(err); }
                return res.ok();
            });
        });
    }
};

