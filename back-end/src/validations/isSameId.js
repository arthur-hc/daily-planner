const { ObjectId } = require('mongodb');

// Source: https://mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html;
module.exports = (firstId, secondId) => ObjectId(firstId).equals(secondId);