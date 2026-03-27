const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const port = process.env.PORT || 3002;

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Menu Service API',
      version: '1.0.0',
      description: 'CRUD API for menu items',
    },
    servers: [{ url: `http://localhost:${port}` }],
    tags: [{ name: 'Menu', description: 'Menu items' }],
    components: {
      schemas: {
        MenuItem: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            price: { type: 'number' },
            category: { type: 'string' },
            availability: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        MenuInput: {
          type: 'object',
          required: ['name', 'price', 'category', 'availability'],
          properties: {
            name: { type: 'string' },
            price: { type: 'number', minimum: 0 },
            category: { type: 'string' },
            availability: { type: 'boolean' },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, 'routes', '*.js')],
};

module.exports = swaggerJsdoc(options);
