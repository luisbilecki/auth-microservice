const middy = require('@middy/core');
const createError = require('http-errors');
const errorHandler = require('../middlewares/error');

const db = require('../database/mongo');
const User = require('../models/user');
const { verifyToken } = require('../helpers/jwt');

const auth = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const authorizationHeader = event.headers && event.headers.Authorization;

  // Authorization is empty
  if (!authorizationHeader) {
    throw createError.Unauthorized();
  }

  // Extract token type and value
  const tokenParts = authorizationHeader.split(' ');
  const tokenType = tokenParts[0].toLowerCase(); // e.g. bearer
  const tokenValue = tokenParts[1];

  if (tokenType !== 'bearer' && tokenValue) {
    throw createError.Unauthorized();
  }

  try {
    // Verify and decode token
    const decodedToken = verifyToken(tokenValue);
    const userEmail = decodedToken.email;

    // Connect or get db instance
    await db();

    // Find user in mongo
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      throw createError.Unauthorized();
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ valid: true }),
    };
  } catch (err) {
    throw createError.Unauthorized();
  }
};

const handler = middy(auth).use(errorHandler());

module.exports = { handler };
