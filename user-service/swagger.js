const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const port = process.env.PORT || 3001;

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'User Service API',
      version: '1.0.0',
      description: 'CRUD API for users (food ordering)',
    },
    servers: [{ url: `http://localhost:${port}` }],
    tags: [{ name: 'Users', description: 'User management' }],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            address: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        UserInput: {
          type: 'object',
          required: ['name', 'email', 'phone', 'address'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            address: { type: 'string' },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, 'routes', '*.js')],
};

module.exports = swaggerJsdoc(options);
