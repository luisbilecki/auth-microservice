const { HttpError } = require('http-errors');

module.exports = () => ({
  onError: (handler, next) => {
    if (handler.error instanceof HttpError) {
      // as per JSON spec http://jsonapi.org/examples/#error-objects-basics
      handler.response = {
        statusCode: handler.error.statusCode,
        body: JSON.stringify({
          message: handler.error.message,
          detail: handler.error.details,
        }),
      };
    } else {
      handler.response = {
        statusCode: handler.error.statusCode || 500,
        body: JSON.stringify({
          message: handler.error.message,
        }),
      };
    }

    console.log(handler.response);
    return next();
  },
});
