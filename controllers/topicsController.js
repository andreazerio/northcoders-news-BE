const {Topics, Articles} = require('../models');


const getTopics = (req, res, next) => {
    Topics.find()
        .then(topics => {
            res.status(200).send({ topics });
        })
        .catch(err => next(err));
};

const getArticlesByTopic = (req, res, next) => {
    const topic_id = req.params.topic_id;
    Articles.find({ belongs_to: topic_id })
        .then(articles => {
            if (articles.length === 0) return next({ status: 404, message: 'topic not found' })
            res.status(200).send({ articles })
        })
        .catch(err => {
            if (err.name === 'CastError') next({ status: 404, message: 'topic not found' });
            next(err)
        });
};


module.exports = {getTopics, getArticlesByTopic}