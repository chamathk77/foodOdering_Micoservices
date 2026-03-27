const express = require('express');
const { body, param } = require('express-validator');
const { ORDER_STATUSES } = require('../models/Order');
const orderController = require('../controllers/orderController');
const validate = require('../middleware/validate');

const router = express.Router();

const idParam = param('id').isMongoId().withMessage('Invalid id');

const bodyRules = [
  body('userId').trim().notEmpty().withMessage('userId is required'),
  body('items')
    .isArray({ min: 1 })
    .withMessage('items must be a non-empty array'),
  body('items.*').isString().trim().notEmpty().withMessage('each item id must be a non-empty string'),
  body('totalAmount').isFloat({ min: 0 }).withMessage('totalAmount must be a number >= 0'),
  body('status')
    .optional()
    .isIn(ORDER_STATUSES)
    .withMessage(`status must be one of: ${ORDER_STATUSES.join(', ')}`),
];

/**
 * @openapi
 * /orders:
 *   get:
 *     tags: [Orders]
 *     summary: List all orders
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', orderController.listOrders);

/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Get order by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.get('/:id', idParam, validate, orderController.getOrder);

/**
 * @openapi
 * /orders:
 *   post:
 *     tags: [Orders]
 *     summary: Create order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */
router.post('/', bodyRules, validate, orderController.createOrder);

/**
 * @openapi
 * /orders/{id}:
 *   put:
 *     tags: [Orders]
 *     summary: Update order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.put('/:id', idParam, bodyRules, validate, orderController.updateOrder);

/**
 * @openapi
 * /orders/{id}:
 *   delete:
 *     tags: [Orders]
 *     summary: Delete order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.delete('/:id', idParam, validate, orderController.deleteOrder);

module.exports = router;
