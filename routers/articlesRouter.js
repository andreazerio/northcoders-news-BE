const router = require('express').Router();
const {getArticles, getCommentsByArticleId, addComment} = require('../controllers/index');

router.route('/')
.get(getArticles);

router.route('/:article_id/comments')
.get(getCommentsByArticleId)
.post(addComment)

module.exports = router;