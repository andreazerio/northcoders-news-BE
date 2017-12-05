const {Articles,Comments} = require('../models');

const getArticles = (req, res, next) => {
  Articles.find()
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(err => next(err));
};

const getArticleById = (req, res, next) => {
  const article_id = req.params.article_id;
  Articles.find({_id: article_id})
    .then(article => {
      if (article.length === 0) return next({ status: 404, message: 'article not found' });
      res.status(200).send({article});
    })
    .catch(err => {
      if (err.name === 'CastError') next({ status: 400, message: 'article not found' });
      next(err);
    
    });
};

const getCommentsByArticleId = (req, res, next) => {
  const article_id = req.params.article_id;
  Comments.find({ belongs_to: article_id })
    .then(comments => {
      if (comments.length === 0) return next({ status: 404, message: 'article not found' });
      res.status(200).send({ comments });
    })
    .catch(err => {
      if (err.name === 'CastError') next({ status: 400, message: 'article_id not valid' });
      next(err);
    });
};

const addComment = (req, res, next) => {
  const postBody = req.body.comment;
  const article_id = req.params.article_id;
  if (/^\s*$/g.test(postBody)) return next({ status: 400, message: 'comment not valid - provide comment body' });
  const comment = new Comments({
    body: postBody,
    belongs_to: article_id
  });
  comment.save()
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(err => {
      if(err.name === 'ValidationError')   next({status: 400, message: 'validation error - comment not valid'});
      next(err);
    });
};

const voteArticle = (req, res, next) => {
  const article_id = req.params.article_id;
  const query = req.query.vote;
  let increment;

  if (query === 'up') increment = 1;
  else if (query === 'down') increment = -1;

  Articles.findByIdAndUpdate(article_id, { $inc: { votes: increment } }, { new: true })
    .then(article => {
      res.send({ article });
    })
    .catch(err => {
      if (err.name === 'CastError') return next({ status: 400, message: 'article not found' });
      next(err);
    });
};

module.exports = {getArticles, getCommentsByArticleId, addComment, voteArticle, getArticleById};