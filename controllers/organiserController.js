const courseModel = require('../models/course');
const classModel = require('../models/class');

exports.dashboard = (req, res) => {
  courseModel.getAllCourses((err, courses) => {
    if (err) return res.send('Error loading courses.');

    // Fetch classes for each course
    let completed = 0;
    courses.forEach((course, i) => {
      classModel.getClassesByCourse(course._id, (err, classes) => {
        courses[i].classes = classes;
        completed++;
        if (completed === courses.length) {
          res.render('organiser/dashboard', { courses });
        }
      });
    });

    // If no courses
    if (courses.length === 0) {
      res.render('organiser/dashboard', { courses: [] });
    }
  });
};

//render add course form
exports.showAddCourseForm = (req, res) => {
  res.render('organiser/add-course');
};

//add course
exports.addCourse = (req, res) => {
  const { name, description, duration, price, location } = req.body;
  const newCourse = { name, description, duration, price, location };
  courseModel.addCourse(newCourse, () => {
    res.redirect('/organiser/dashboard');
  });
};

//render add class form
exports.showAddClassForm = (req, res) => {
  const { courseId } = req.query;
  res.render('organiser/add-class', { courseId });
};

//add class
exports.addClass = (req, res) => {
  const { courseId, datetime, location, description } = req.body;
  const newClass = { courseId, datetime, location, description, attendees: [] };
  classModel.addClass(newClass, () => {
    res.redirect('/organiser/dashboard');
  });
};

// Show edit class form
exports.showEditClassForm = (req, res) => {
    const { id } = req.params;
    const classModel = require('../models/class');
    classModel.getClassById(id, (err, cls) => {
      if (!cls) return res.redirect('/organiser/dashboard');
      res.render('organiser/edit-class', cls);
    });
  };
  
  // Update class
  exports.updateClass = (req, res) => {
    const { id } = req.params;
    const { datetime, location, description } = req.body;
    const classModel = require('../models/class');
  
    const updated = { datetime, location, description };
    classModel.updateClass(id, updated, () => {
      res.redirect('/organiser/dashboard');
    });
  };
  

  // Delete class
  exports.deleteClass = (req, res) => {
    const { id } = req.params;
    const classModel = require('../models/class');
    classModel.deleteClass(id, () => {
      res.redirect('/organiser/dashboard');
    });
  };


  // Delete course
  exports.deleteCourse = (req, res) => {
    const { id } = req.params;
    const courseModel = require('../models/course');
    const classModel = require('../models/class');
  
    // Remove all classes tied to the course
    classModel.getClassesByCourse(id, (err, classes) => {
      classes.forEach(c => {
        classModel.deleteClass(c._id, () => {});
      });
  
      courseModel.deleteCourse(id, () => {
        res.redirect('/organiser/dashboard');
      });
    });
  };

  const bookingModel = require('../models/booking');

// Show participants for a class
exports.showParticipants = (req, res) => {
  const classId = req.params.id;

  bookingModel.getParticipantsByClass(classId, (err, participants) => {
    if (err) return res.send('Error loading participants.');

    res.render('organiser/class-participants', { participants, classId });
  });
};

// Remove participant from class
exports.removeParticipant = (req, res) => {
  const bookingId = req.params.bookingId;
  const classId = req.params.classId;

  bookingModel.removeParticipant(bookingId, (err) => {
    if (err) return res.send('Error removing participant.');
    
    res.redirect(`/organiser/class-participants/${classId}`);
  });
};

const userModel = require('../models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// Show all organisers
exports.showOrganisers = (req, res) => {
  userModel.getUsersByRole('organiser', (err, organisers) => {
    if (err) return res.send('Error loading organisers.');
    res.render('organiser/organisers', { organisers });
  });
};

// Add organiser form
exports.showAddOrganiserForm = (req, res) => {
  res.render('organiser/add-organiser');
};

// Add organiser 
exports.addOrganiser = (req, res) => {
  const { username, password } = req.body;

  userModel.addUser(username, password, 'organiser', (err, newOrganiser) => {
    if (err) return res.send('Error adding organiser.');

    res.redirect('/organiser/organisers');
  });
};

// Delete organiser
exports.deleteOrganiser = (req, res) => {
  const { id } = req.params;
  userModel.deleteUser(id, (err) => {
    if (err) return res.send('Error deleting organiser.');
    res.redirect('/organiser/organisers');
  });
};
