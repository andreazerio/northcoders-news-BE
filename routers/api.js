const router = require('express').Router();
const topics = require('./topicsRouter.js')


router.route('/')
.get((req,res) => {
  res.status(200).send({status: 'root path working'});
});

router.use('/topics', topics);

module.exports = router;