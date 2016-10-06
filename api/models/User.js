/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,
  attributes: {
    username: {},
    password: {},
    email: {},
    firstName: {},
    lastName: {},
    toJson: function() {
      var obj = this.toObject();
      /* todo remove password */
      return obj;
    }
  },
  beforeUpdate: function(value, next) {
    /*todo hash password*/
  }, beforeCreate: function(value, next) {
    /*todo hash password*/
  }
};

