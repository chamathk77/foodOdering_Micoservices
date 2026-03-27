const express = require('express');
const { body, param } = require('express-validator');
const { PAYMENT_STATUSES } = require('../models/Payment');
const paymentController = require('../controllers/paymentController');
const validate = require('../middleware/validate');

const router = express.Router();

const idParam = param('id').isMongoId().withMessage('Invalid id');

const bodyRules = [
  body('orderId').trim().notEmpty().withMessage('orderId is required'),
  body('amount').isFloat({ min: 0 }).withMessage('amount must be a number >= 0'),
  body('paymentMethod').trim().notEmpty().withMessage('paymentMethod is required'),
  body('status')
    .optional()
    .isIn(PAYMENT_STATUSES)
    .withMessage(`status must be one of: ${PAYMENT_STATUSES.join(', ')}`),
];

/**
 * @openapi
 * /payments:
 *   get:
 *     tags: [Payments]
 *     summary: List all payments
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', paymentController.listPayments);

/**
 * @openapi
 * /payments/{id}:
 *   get:
 *     tags: [Payments]
 *     summary: Get payment by id
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
router.get('/:id', idParam, validate, paymentController.getPayment);

/**
 * @openapi
 * /payments:
 *   post:
 *     tags: [Payments]
 *     summary: Create payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentInput'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */
router.post('/', bodyRules, validate, paymentController.createPayment);

/**
 * @openapi
 * /payments/{id}:
 *   put:
 *     tags: [Payments]
 *     summary: Update payment
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
 *             $ref: '#/components/schemas/PaymentInput'
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.put('/:id', idParam, bodyRules, validate, paymentController.updatePayment);

/**
 * @openapi
 * /payments/{id}:
 *   delete:
 *     tags: [Payments]
 *     summary: Delete payment
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
router.delete('/:id', idParam, validate, paymentController.deletePayment);

module.exports = router;
