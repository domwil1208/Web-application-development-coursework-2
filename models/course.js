const Datastore = require('nedb');
const path = require('path');

const db = new Datastore({ filename: path.join(__dirname, '../db/courses.db'), autoload: true });

exports.addCourse = (course, callback) => {
  db.insert(course, callback);
};

exports.getAllCourses = (callback) => {
  db.find({}, callback);
};

exports.getCourseById = (id, callback) => {
  db.findOne({ _id: id }, callback);
};

exports.deleteCourse = (id, callback) => {
  db.remove({ _id: id }, {}, callback);
};

exports.updateCourse = (id, updatedData, callback) => {
  db.update({ _id: id }, { $set: updatedData }, {}, callback);
};
