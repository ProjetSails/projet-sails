/**
 * CameraController
 *
 * @description :: Server-side logic for managing cameras
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function (req, res) {
        sails.log.debug("Hi!");
        if (req.isSocket == true) {
            Device.find().exec(function(err, devices) {
                Device.subscribe(req.socket, devices);
            });
        }
    }
};

