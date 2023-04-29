var express = require('express');
const { signupController, loginController, profileController } = require('../controllers/authController');
const { authMiddleware } = require('../middleware');
var router = express.Router();


//POST signup
router.post('/signup',signupController)
router.post('/login',loginController)
router.get('/me',authMiddleware,profileController)

module.exports = router;
