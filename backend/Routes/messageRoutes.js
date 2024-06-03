const express = require('express');
const {sendMessage, allMessages} = require('../controllers/messageController');
const router = express.Router();
const { isUserAuthorized } = require('../middleware.js/authMiddleware');


router.route('/').post(isUserAuthorized,sendMessage);
router.route('/:chatId').get(isUserAuthorized,allMessages);

module.exports = router;

