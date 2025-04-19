const Datastore = require('nedb');
const bcrypt = require('bcrypt');
const path = require('path');

const db = new Datastore({ filename: path.join(__dirname, '../db/users.db'), autoload: true });


// Add organiser to database
exports.addUser = (username, password, role = 'user', callback) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return callback(err);
      const user = { username, passwordHash: hash, role };
      db.insert(user, callback);
    });
  };

exports.findUser = (username, callback) => {
    db.findOne({ username }, callback);
  };


 exports.getUsersByRole = (role, callback) => {
   db.find({ role }, callback);
 };
 
 
 exports.deleteUser = (id, callback) => {
   db.remove({ _id: id }, {}, callback);
 };