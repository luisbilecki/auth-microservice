const middy = require('@middy/core');
const jsonBodyParser = require('@middy/http-json-body-parser');
const validator = require('@middy/validator');

const bcrypt = require('bcrypt');

const createError = require('http-errors');
const errorHandler = require('../middlewares/error');

const db = require('../database/mongo');
const User = require('../models/user');
const { signToken } = require('../helpers/jwt');
const signInSchema = require('../schemas/signin.schema');

// Business logic for sign in
const signIn = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { email, password } = event.body;

  await db();

  // Check if email exists
  const user = await User.findOne({ email });

  if (!user) {
    throw createError.Unauthorized();
  }

  // Compare passwords
  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    throw createError.Unauthorized();
  }

  // Issue JWT
  const tokenJwt = signToken(email);

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      token: tokenJwt,
    }),
  };
};

// Attach middy and returns handler
const handler = middy(signIn)
  .use(jsonBodyParser())
  .use(validator({ inputSchema: signInSchema }))
  .use(errorHandler());

module.exports = { handler };
