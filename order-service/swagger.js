const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const port = process.env.PORT || 3003;

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Order Service API',
      version: '1.0.0',
      description: 'CRUD API for orders',
    },
    servers: [{ url: `http://localhost:${port}` }],
    tags: [{ name: 'Orders', description: 'Orders' }],
    components: {
      schemas: {
        Order: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            userId: { type: 'string' },
            items: {
              type: 'array',
              items: { type: 'string' },
            },
            totalAmount: { type: 'number' },
            status: {
              type: 'string',
              enum: ['pending', 'completed', 'cancelled'],
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        OrderInput: {
          type: 'object',
          required: ['userId', 'items', 'totalAmount'],
          properties: {
            userId: { type: 'string' },
            items: {
              type: 'array',
              items: { type: 'string' },
              minItems: 1,
            },
            totalAmount: { type: 'number', minimum: 0 },
            status: {
              type: 'string',
              enum: ['pending', 'completed', 'cancelled'],
            },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, 'routes', '*.js')],
};

module.exports = swaggerJsdoc(options);
