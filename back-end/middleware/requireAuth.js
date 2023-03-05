const jwt = require('jsonwebtoken');
const User = require('../models/userModels');


const requireAuth = async (req, res, next) => {

  const {authorization} = req.headers;

  if (!authorization) {
    return res.status(401).json({error: 'Request is not authorized'});
  }

  const token = authorization.split(' ')[1];

  try {
    const {id} = jwt.verify(token, process.env.JWT_SECRET);

    // compare the token with the user's id
    req.user = await User.findOne({_id: id}).select('_id');
    console.log(req.user, id, "1")
    next()

  } catch (err) {
    console.log(err);
    res.status(401).json({error: 'Request is not authorized'});
  }

};

module.exports = requireAuth;

process.env
