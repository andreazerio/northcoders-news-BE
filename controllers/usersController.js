const {Users} = require('../models/models.js');

const getUserByUsername = (req, res, next) => {
    const user_name = req.params.username;
    Users.findOne({username: user_name})
    .then(user => {
        if (!user) return next({status: 404, message: 'Username does not match any user'})
        res.status(200).send({user});
    })
    .catch(err => next(err))
};


module.exports = {getUserByUsername}