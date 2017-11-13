const { Topics, Articles, Comments, Users} = require('../models/models.js');

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
        .catch(err => next(err));
};

const getArticles = (req, res, next) => {
    Articles.find()
        .then(articles => {
            res.status(200).send({ articles })
        })
        .catch(err => next(err));
};

const getCommentsByArticleId = (req, res, next) => {
    const article_id = req.params.article_id;
    Comments.find({ belongs_to: article_id })
        .then(comments => {
            if (comments.length === 0) return next({ status: 404, message: 'article not found' })
            res.status(200).send({ comments });
        })
        .catch(err => {
            if (err.name === 'CastError') next({ status: 404, message: 'article_id not valid' })
            next(err)
        });
};

const addComment = (req, res, next) => {
    const postBody = req.body.comment;
    const article_id = req.params.article_id;
    if (/^\s*$/g.test(postBody)) return next({ status: 400, message: 'comment not valid - provide comment body' });
    const comment = new Comments({
        body: postBody,
        belongs_to: article_id
    })
        .save()
        .then(comment => {
            res.status(201).send({ comment })
        })
        .catch(err => next(err));
};

const voteArticle = (req, res, next) => {
    const article_id = req.params.article_id;
    const query = req.query.vote;
    let increment;

    if (query === 'up') increment = 1;
    else if (query === 'down') increment = -1;

    Articles.findByIdAndUpdate(article_id, { $inc: { votes: increment } }, { new: true })
        .then(article => {
            res.send({ article })
        })
        .catch(err => {
            if (err.name === 'CastError') return next({ status: 404, message: 'article not found' });
            next(err);
        });
};

const voteComment = (req, res, next) => {
    const comment_id = req.params.comment_id;
    const query = req.query.vote;
    let increment;

    if (query === 'up') increment = 1;
    else if (query === 'down') increment = -1;

    Comments.findByIdAndUpdate(comment_id, { $inc: { votes: increment } }, { new: true })
        .then(comment => {
            res.send({ comment })
        })
        .catch(err => {
            if (err.name === 'CastError') return next({ status: 404, message: 'comment not found' });
            next(err);
        });
};

const deleteComment = (req, res, next) => {
    const comment_id = req.params.comment_id;
    Comments.findByIdAndRemove(comment_id)
        .exec()
        .then(comment => {
            res.status(204).send();
        })
        .catch(err => {
            if (err.name === 'CastError') return next({ status: 404, message: 'comment not found' });
            next(err);
        });
};

const getUserByUsername = (req, res, next) => {
    const user_name = req.params.username;
    Users.findOne({username: user_name})
    .then(user => {
        if (!user) return next({status: 404, message: 'Username does not match any user'})
        res.status(200).send({user});
    })
    .catch(err => next(err))
};

module.exports = { getTopics, getArticlesByTopic, getArticles, getCommentsByArticleId, addComment, voteArticle, voteComment, deleteComment, getUserByUsername }