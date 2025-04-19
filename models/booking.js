const Datastore = require('nedb');
const path = require('path');

const db = new Datastore({ filename: path.join(__dirname, '../db/bookings.db'), autoload: true });

exports.addBooking = (booking, callback) => {
  db.insert(booking, callback);
};

exports.getBookingsByClass = (classId, callback) => {
  db.find({ type: 'class', classId }, callback);
};

exports.getBookingsByCourse = (courseId, callback) => {
  db.find({ type: 'course', courseId }, callback);
};

// Get all participants for a specific class
const classesDb = new Datastore({
  filename: path.resolve(__dirname, '../db/classes.db'),
  autoload: true
});

exports.getParticipantsByClass = (classId, callback) => {


  classesDb.findOne({ _id: classId }, (err, classObj) => {
    if (err || !classObj) {
      console.log('Error or class not found:', err || 'Class not found');
      return callback(err || new Error('Class not found'));
    }
    

    db.find({ type: 'class', classId }, (err, classParticipants) => {
      if (err) {
        console.log('Error fetching participants:', err);
        return callback(err);
      }


      callback(null, classParticipants);
    });
  });
};





  // Remove participant from a class
  exports.removeParticipant = (bookingId, callback) => {
    db.remove({ _id: bookingId }, {}, callback);
  };
  
  