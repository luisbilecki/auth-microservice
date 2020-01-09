const bcrypt = require('bcrypt');
const middy = require('@middy/core');
const jsonBodyParser = require('@middy/http-json-body-parser');
const validator = require('@middy/validator');
const errorHandler = require('../middlewares/error');

const db = require('../database/mongo');
const User = require('../models/user');
const signUpSchema = require('../schemas/signup.schema');

const signUp = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { email, password } = event.body;

  await db();

  const user = new User({
    email,
    password: bcrypt.hashSync(password, 10),
  });

  await user.save();

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};

// Attach middy and returns handler
const handler = middy(signUp)
  .use(jsonBodyParser())
  .use(validator({ inputSchema: signUpSchema }))
  .use(errorHandler());

module.exports = { handler };
