const router = require('express').Router();
const {getTopics} = require('../controllers/index')

router.route('/')
.get(getTopics);

module.exports = router;