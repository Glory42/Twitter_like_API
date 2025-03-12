const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const auth = require('../middleware/auth');

router.post('/:id/follow', auth, usersController.follow);
router.delete('/:id/unfollow', auth, usersController.unfollow);

module.exports = router;