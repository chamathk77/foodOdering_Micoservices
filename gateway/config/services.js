module.exports = {
  user: process.env.USER_SERVICE_URL || 'http://localhost:3001',
  menu: process.env.MENU_SERVICE_URL || 'http://localhost:3002',
  order: process.env.ORDER_SERVICE_URL || 'http://localhost:3003',
  payment: process.env.PAYMENT_SERVICE_URL || 'http://localhost:3004',
};
