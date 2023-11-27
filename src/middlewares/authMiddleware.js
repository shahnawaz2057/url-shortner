const { User } = require('../models')
const NotAuthenticatedError = require("../errors/notAuthenticatedError");
const NotFoundError = require('../errors/notFoundError');

const authenticateUser = async (req, res, next) => {

  const userId = req.headers.authorization;
  console.log('userId', userId);
  if(userId){
    const user = await User.findOne({ where : {id: parseInt(userId)}});
    if(!user){
      throw new NotFoundError('user not found');
    }

    req.user = {
      userId: user.id,
      isAdmin: user.isAdmin,
      isActive: user.isActive
    }
    next();

  }else {
    throw new NotAuthenticatedError('You are not authenticated');
  }
}

module.exports = {
  authenticateUser,
}