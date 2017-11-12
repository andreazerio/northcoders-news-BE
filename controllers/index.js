const {Topics, Articles} = require('../models/models.js');

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
        res.status(200).send({articles})
    })
    .catch(err => {
        if (err) next(err);
    });
};

module.exports = {getTopics, getArticlesByTopic}