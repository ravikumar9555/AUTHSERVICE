const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user-controller');
const {AuthRequestValidator} = require('../../middlewares/index')
router.post('/signup' ,AuthRequestValidator.validateUserSignup,  UserController.create);
router.post('/signin',AuthRequestValidator.validateUserSignup, UserController.signIn)

module.exports = router;