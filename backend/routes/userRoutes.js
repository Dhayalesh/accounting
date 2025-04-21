const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users-create', userController.createUser);
router.put('/users-update/:id', userController.updateUser);

module.exports = router;
