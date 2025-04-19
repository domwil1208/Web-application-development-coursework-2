const courseModel = require('../models/course');
const classModel = require('../models/class');

exports.showHome = (req, res) => {
  res.render('public/home');
};

//show courses
exports.showCourses = (req, res) => {
  courseModel.getAllCourses((err, courses) => {
    if (err) return res.send('Error loading courses.');

    let completed = 0;
    if (courses.length === 0) return res.render('public/courses', { courses: [] });

    courses.forEach((course, i) => {
      classModel.getClassesByCourse(course._id, (err, classes) => {
        courses[i].classes = classes;
        completed++;
        if (completed === courses.length) {
          res.render('public/courses', { courses });
        }
      });
    });
  });
};

const bookingModel = require('../models/booking');

exports.showClassBookingForm = (req, res) => {
  res.render('public/book-class', { classId: req.params.id });
};

exports.submitClassBooking = (req, res) => {
  const { name, email } = req.body;
  const booking = {
    type: 'class',
    classId: req.params.id,
    name,
    email,
    timestamp: Date.now()
  };

  bookingModel.addBooking(booking, () => {
    res.render('public/thanks', { name });
  });
};

exports.showCourseBookingForm = (req, res) => {
  res.render('public/book-course', { courseId: req.params.id });
};

exports.submitCourseBooking = (req, res) => {
    const { name, email } = req.body;
    const booking = {
      type: 'course',
      courseId: req.params.id,
      name,
      email,
      timestamp: Date.now()
    };
  
  

  bookingModel.addBooking(booking, () => {
    res.render('public/thanks', { name });
  });
};
