const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const port = process.env.PORT || 3004;

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Payment Service API',
      version: '1.0.0',
      description: 'CRUD API for payments',
    },
    servers: [{ url: `http://localhost:${port}` }],
    tags: [{ name: 'Payments', description: 'Payments' }],
    components: {
      schemas: {
        Payment: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            orderId: { type: 'string' },
            amount: { type: 'number' },
            paymentMethod: { type: 'string' },
            status: { type: 'string', enum: ['paid', 'failed'] },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        PaymentInput: {
          type: 'object',
          required: ['orderId', 'amount', 'paymentMethod'],
          properties: {
            orderId: { type: 'string' },
            amount: { type: 'number', minimum: 0 },
            paymentMethod: { type: 'string' },
            status: { type: 'string', enum: ['paid', 'failed'] },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, 'routes', '*.js')],
};

module.exports = swaggerJsdoc(options);
