const {Topics} = require('../models/models.js');

const getTopics = (req, res, next) => {
    Topics.find()
    .then(topics => {
        res.status(200).send({topics});
    })
    .catch(err => {
     if (err) next(err)
    });
}

module.exports = {getTopics}