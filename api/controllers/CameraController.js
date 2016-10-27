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
            var socket = req.socket;
            sails.log.debug("Socket catch!");
            sails.sockets.join(socket, "Test");
            sails.sockets.broadcast('Test', { greeting: 'Hola!' });

        }
    }
};

