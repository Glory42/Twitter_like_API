const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/:id/follow', auth, userController.follow);
router.delete('/:id/unfollow', auth, userController.unfollow);

module.exports = router;