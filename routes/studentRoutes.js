const express = require('express');
const router = express.Router();

const Student = require('../controller/studentController')

router.get('/', Student.initializeUi);
router.get('/add-student-form', Student.newStudentForm);
router.post('/student/add', Student.addStudent);
router.get('/edit-student-form/:nic', Student.updateStudentForm);
router.post('/edit', Student.updateStudent);
router.get('/delete/:nic', Student.deleteStudent);
router.get('/view/:nic', Student.viewStudent);
router.post('/', Student.findStudent)

module.exports = router;