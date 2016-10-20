/**
 * DeviceController
 *
 * @description :: Server-side logic for managing Devices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    mine: function (req, res) {
        Group.find({ user: req.user})
            .exec(function (err, groups) {
                if (err) {
                    return res.serverError(err);
                }
                groups.forEach(function (group, index) {
                    Device.find({ group: group['id'] })
                        .exec(function (err, devices) {
                            if (err) {
                                return res.serverError(err);
                            }
                            return res.json(devices);
                        });
                });
                return res.serverError('L\'utilisateur n\'appartient a aucun groupe');
            });
    }

};

