const express = require('express');
const { body, param } = require('express-validator');
const userController = require('../controllers/userController');
const validate = require('../middleware/validate');

const router = express.Router();

const idParam = param('id').isMongoId().withMessage('Invalid id');

const bodyRules = [
  body('name').trim().notEmpty().withMessage('name is required.Please provide a name.'),
  body('email').isEmail().withMessage('valid email is required.Please provide a valid email.'),
  body('phone').trim().notEmpty().withMessage('phone is required.Please provide a phone number.'),
  body('address').trim().notEmpty().withMessage('address is required.Please provide an address.'),
];

/**
 * @openapi
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: List all users
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', userController.listUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by id
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
router.get('/:id', idParam, validate, userController.getUser);

/**
 * @openapi
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Create user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */
router.post('/', bodyRules, validate, userController.createUser);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Update user
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
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.put('/:id', idParam, bodyRules, validate, userController.updateUser);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete user
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
router.delete('/:id', idParam, validate, userController.deleteUser);

module.exports = router;
