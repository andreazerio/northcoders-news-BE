const {Comments} = require('../models');

const voteComment = (req, res, next) => {
  const comment_id = req.params.comment_id;
  const query = req.query.vote;
  let increment;

  if (query === 'up') increment = 1;
  else if (query === 'down') increment = -1;

  Comments.findByIdAndUpdate(comment_id, { $inc: { votes: increment } }, { new: true })
    .then(comment => {
      res.send({ comment });
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
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      if (err.name === 'CastError') return next({ status: 404, message: 'comment not found' });
      next(err);
    });
};

module.exports = {voteComment, deleteComment};