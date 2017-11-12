const router = require('express').Router();
const {getArticles} = require('../controllers/index');

router.route('/')
.get(getArticles);

module.exports = router;