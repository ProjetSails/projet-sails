/**
 * DeviceController
 *
 * @description :: Server-side logic for managing Devices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    mine: function (req, res) {
        GroupUserRole.find({ user: req.user['id']})
            .exec(function (err, groups) {
                if (err) {
                    return res.serverError(err);
                }
                groups.forEach(function (group, index) {
                    Device.find({ group: group['group'] })
                        .exec(function (err, devices) {
                            if (err) {
                                return res.serverError(err);
                            }
                            return res.json(devices);
                        });
                });
            });
    }

};

