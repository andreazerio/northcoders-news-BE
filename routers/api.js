const router = require('express').Router();
const topics = require('./topicsRouter')
const articles = require('./articlesRouter')
const comments = require('./commentsRouter')

router.route('/')
.get((req,res) => {
  res.status(200).send({status: 'root path working'});
});

router.use('/topics', topics);
router.use('/articles', articles);
router.use('/comments', comments)

module.exports = router;