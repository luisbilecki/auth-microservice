# Auth microservice

An example of Auth microservice using Node.js, Serverless framework, and Mongo.DB.

## How to deploy?

Make sure serverless framework is installed:

```bash
  yarn global add serverless
```

Install dependencies:

```bash
  yarn install
```

Configure .env with JWT Secret and MongoDB URI (you can use MongoDB Atlas):

```bash
MONGODB_URI=<MY_URI>
JWT_SECRET=<MY_SECRET>
```

Configure serverless framework with AWS access key and secret:

```
  serverless config credentials --provider aws --key <ID> --secret <SECRET> --profile devProfile
```

Deploy:

```bash
  serverless deploy
```

## Notes:

- There are many ways to create protected serverless functions. To see more about serverless auth, read [this](https://github.com/DavidWells/serverless-auth-strategies);
- Mongoose recommendations for Lambda functions: https://mongoosejs.com/docs/lambda.html;
- MongoDB guidelines for Serverless: https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas;
- I took as guide this [walkthrough](https://www.freecodecamp.org/news/a-crash-course-on-securing-serverless-apis-with-json-web-tokens-ff657ab2f5a5/) to understand and apply authentication in Node.js microservices;

## Todo:

- Include customAuthorizer in verifyAuth function (https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html);
- Verify if user is already registered on sign up;
- Write tests for microservice;
- Write endpoint documentations in README.md;
- Include cors middleware in middy handler.

## Contribute:

This is my first microservice using AWS Lambda :wink:. Please feel free to contribute, forking this repository, and sending your pull request
