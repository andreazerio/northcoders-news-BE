const {Topics, Articles, Comments} = require('../models/models.js');

const getTopics = (req, res, next) => {
    Topics.find()
    .then(topics => {
        res.status(200).send({topics});
    })
    .catch(err => {
     if (err) next(err)
    });
};

const getArticlesByTopic = (req, res, next) => {
    const topic_id = req.params.topic_id;
    Articles.find({belongs_to: topic_id})
    .then(articles => {
        if (articles.length === 0) return next({status: 404, message: 'topic not found'})
        res.status(200).send({articles})
    })
    .catch(err => {
        if (err) next(err);
    });
};

const getArticles = (req, res, next) => {
    Articles.find()
    .then(articles => {
        res.status(200).send({articles})
    })
    .catch(err => {
        if (err) next(err)
    });
};

const getCommentsByArticleId = (req, res, next) => {
    const article_id = req.params.article_id;
    Comments.find({belongs_to: article_id})
    .then(comments => {
        res.status(200).send({comments});
    });
};

module.exports = {getTopics, getArticlesByTopic, getArticles, getCommentsByArticleId}