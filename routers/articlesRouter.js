const router = require('express').Router();
const {getArticles, getCommentsByArticleId} = require('../controllers/index');

router.route('/')
.get(getArticles);

router.route('/:article_id/comments')
.get(getCommentsByArticleId)

module.exports = router;