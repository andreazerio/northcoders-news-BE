const router = require('express').Router();
const {getUserByUsername} = require('../controllers/usersController');

router.route('/:username')
  .get(getUserByUsername);
module.exports = router;