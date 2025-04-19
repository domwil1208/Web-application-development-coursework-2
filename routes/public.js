const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

// Home/info page
router.get('/', publicController.showHome);

// View all courses
router.get('/courses', publicController.showCourses);

// Book class or course
router.get('/book-class/:id', publicController.showClassBookingForm);
router.post('/book-class/:id', publicController.submitClassBooking);

router.get('/book-course/:id', publicController.showCourseBookingForm);
router.post('/book-course/:id', publicController.submitCourseBooking);


module.exports = router;
