const express = require('express');
const { isUserAuthorized } = require('../middleware.js/authMiddleware');
const {accessChat, getChats,createGroupChat, renameGroup, addToGroup, removeFromGroup} = require('../controllers/chatController');
const router = express.Router();

router.post('/',isUserAuthorized,accessChat);
router.get('/',isUserAuthorized,getChats);

router.post('/group',isUserAuthorized,createGroupChat);
router.put('/rename',isUserAuthorized,renameGroup);
router.put('/removegroup',isUserAuthorized,removeFromGroup);
router.put('/addtogroup',isUserAuthorized,addToGroup);

module.exports = router;