const express = require('express');
const router = express.Router();

const Module = require('../controller/moduleController')

router.get('/', Module.initializeModuleUi);
router.get('/add-module-form', Module.newModuleForm);
router.post('/module/add-module', Module.addModule);
router.get('/edit-module-form/:id', Module.updateModuleForm);
router.post('/edit-module', Module.updateModule);
router.get('/delete-module/:id', Module.deleteModule);
router.get('/view-module/:id', Module.viewModule);
router.post('/', Module.findModule)

module.exports = router;