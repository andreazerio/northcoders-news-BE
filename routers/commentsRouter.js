const router = require('express').Router();
const {voteComment} = require('../controllers/index');

router.route('/:comment_id')
.put(voteComment);
module.exports = router;