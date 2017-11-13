const router = require('express').Router();
const {getArticles, getCommentsByArticleId, addComment, voteArticle} = require('../controllers/index');

router.route('/')
.get(getArticles);

router.route('/:article_id/comments')
.get(getCommentsByArticleId)
.post(addComment);

router.route('/:article_id')
.put(voteArticle);

module.exports = router;