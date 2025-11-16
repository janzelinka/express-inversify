export const loginUserRequestBody = () => {
  return {
    content: {
      'application/json': {
        schema: {
          properties: {
            userName: { type: 'string' },
            password: { type: 'string' },
          },
          required: ['userName', 'password'],
          type: 'object',
        },
      },
    },
  }
}
