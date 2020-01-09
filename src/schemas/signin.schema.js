module.exports = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minimum: 8 },
      },
      required: ['email', 'password'],
    },
  },
};
