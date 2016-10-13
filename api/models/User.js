/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string'
    },
    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },
    toJson: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  beforeUpdate: function(value, next) {
    SecurityService.hashPassword(value);
    return next();
  },
  beforeCreate: function(value, next) {
    SecurityService.hashPassword(value);
    return next();
  }
};

