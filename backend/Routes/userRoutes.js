const express = require('express');
const {registerUser, authUser, allUsers} = require('../controllers/userController');
const {isUserAuthorized} = require('../middleware.js/authMiddleware');
const router = express.Router();


router.get('/',isUserAuthorized,allUsers);
router.post('/',registerUser);
router.post('/login',authUser);


module.exports = router;