const Datastore = require('nedb');
const path = require('path');

const db = new Datastore({ filename: path.join(__dirname, '../db/classes.db'), autoload: true });

exports.getClassById = (id, callback) => {
  db.findOne({ _id: id }, callback);
};


exports.addClass = (cls, callback) => {
  db.insert(cls, callback);
};

exports.getClassesByCourse = (courseId, callback) => {

  db.find({ courseId }, (err, classes) => {

    callback(err, classes);
  });
};

exports.deleteClass = (id, callback) => {
  db.remove({ _id: id }, {}, callback);
};

exports.updateClass = (id, data, callback) => {
  db.update({ _id: id }, { $set: data }, {}, callback);
};

exports.getClassById = (id, callback) => {
  db.findOne({ _id: id }, callback);
};
