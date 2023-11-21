const express = require('express');
const router = express.Router();

const Register = require('../controller/registerController')

router.get('/', Register.initializeRegisterUi);
router.get('/register-student-form', Register.newRegisterForm);
router.post('/register/register-student', Register.registerStudent);
router.get('/edit-register-form/:id', Register.updateRegisterForm);
router.post('/edit-register', Register.updateRegister);
router.get('/delete-register/:id', Register.deleteRegister);
router.get('/view-register/:id', Register.viewRegister);
router.post('/', Register.findRegister)

router.get('/module-register/:module_name', Register.findRegisterStudent);

module.exports = router;