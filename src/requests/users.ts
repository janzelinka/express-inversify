export const createUserRequest = () => {
  return {
    content: {
      'application/json': {
        schema: {
          properties: {
            id: { type: 'string' },
            userName: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            password: { type: 'string' },
            age: { type: 'number' },
            customer: {
              type: 'object',
              properties: {
                id: { type: 'number' },
              },
            },
          },
          required: ['userName', 'firstName', 'lastName', 'age', 'password'],
          type: 'object',
        },
      },
    },
  }
}
