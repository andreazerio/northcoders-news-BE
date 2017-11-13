const router = require('express').Router();
const {getUserByUsername} = require('../controllers/index');

router.route('/:username')
.get(getUserByUsername);
module.exports = router;