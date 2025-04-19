const express = require('express');
const router = express.Router();
const organiserController = require('../controllers/organiserController');

router.get('/dashboard', organiserController.dashboard);

const { requireOrganiser } = require('../middleware/auth');

router.use(requireOrganiser); // protects all organiser routes


module.exports = router;

router.get('/dashboard', organiserController.dashboard);
router.get('/add-course', organiserController.showAddCourseForm);
router.post('/add-course', organiserController.addCourse);
router.get('/add-class', organiserController.showAddClassForm);
router.post('/add-class', organiserController.addClass);

// CLASS EDIT
router.get('/edit-class/:id', organiserController.showEditClassForm);
router.post('/edit-class/:id', organiserController.updateClass);

// DELETE CLASS
router.get('/delete-class/:id', organiserController.deleteClass);

// DELETE COURSE
router.get('/delete-course/:id', organiserController.deleteCourse);

// Show all organisers
router.get('/organisers', organiserController.showOrganisers);

// Add organiser
router.get('/add-organiser', organiserController.showAddOrganiserForm);
router.post('/add-organiser', organiserController.addOrganiser);

// Delete organiser
router.get('/delete-organiser/:id', organiserController.deleteOrganiser);

// Show participants for a class
router.get('/class-participants/:id', organiserController.showParticipants);

// Remove participant from class
router.get('/remove-participant/:classId/:bookingId', organiserController.removeParticipant);
