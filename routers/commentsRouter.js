const router = require('express').Router();
const {voteComment, deleteComment} = require('../controllers/index');

router.route('/:comment_id')
.put(voteComment)
.delete(deleteComment);
module.exports = router;