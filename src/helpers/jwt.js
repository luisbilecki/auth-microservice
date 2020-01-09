const jwt = require('jsonwebtoken');

// Constants
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE_TIME = '1d';

const signToken = email => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_EXPIRE_TIME });
};

const verifyToken = token => {
  const options = {}; // audience, ...

  return jwt.verify(token, JWT_SECRET, options);
};

module.exports = {
  signToken,
  verifyToken,
};
