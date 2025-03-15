const express = require('express');
const router = express.Router();
const tweetController = require('../controllers/tweetController');
const auth = require('../middleware/auth');

router.post('/', auth, tweetController.createTweet);
router.get('/', auth, tweetController.getTweetAll);

module.exports = router;