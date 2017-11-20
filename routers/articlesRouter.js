const router = require('express').Router();
const {getArticles, getCommentsByArticleId, addComment, voteArticle, getArticleById} = require('../controllers/index');

router.route('/')
.get(getArticles);

router.route('/:article_id/comments')
.get(getCommentsByArticleId)
.post(addComment);

router.route('/:article_id')
.get(getArticleById)
.put(voteArticle);

module.exports = router;