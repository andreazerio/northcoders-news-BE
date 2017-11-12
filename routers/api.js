const router = require('express').Router();
const topics = require('./topicsRouter.js')
const articles = require('./articlesRouter')


router.route('/')
.get((req,res) => {
  res.status(200).send({status: 'root path working'});
});

router.use('/topics', topics);
router.use('/articles', articles);

module.exports = router;