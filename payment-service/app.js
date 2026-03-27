require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');
const paymentRoutes = require('./routes/paymentRoutes');
const errorHandler = require('./middleware/errorHandler');
const swaggerSpec = require('./swagger');

connectDB();

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/payments', paymentRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not found' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Payment service listening on http://localhost:${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});
