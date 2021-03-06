const router = require('express').Router();
const {getTopics, getArticlesByTopic} = require('../controllers/topicsController');

router.route('/')
  .get(getTopics);

router.route('/:topic_id/articles')
  .get(getArticlesByTopic);

module.exports = router;