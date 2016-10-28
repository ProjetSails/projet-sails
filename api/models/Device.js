/**
 * Device.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      nom: {
          type: 'string',
          required: true,
          unique: true
      },
      etat: {
          type: 'boolean',
          required: true
      },
      code_carte: {
          type: 'string',
          required: true,
          unique: true
      },
      group: {
          model: 'group'
      },
      angle: {
          type: 'int'
      }

  }
};

