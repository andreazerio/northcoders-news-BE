const router = require('express').Router();


router.route('/')
.get((req,res) => {
  res.status(200).send({status: 'root path working'});
});

module.exports = router;