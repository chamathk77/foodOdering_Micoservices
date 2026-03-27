const express = require('express');
const { body, param } = require('express-validator');
const menuController = require('../controllers/menuController');
const validate = require('../middleware/validate');

const router = express.Router();

const idParam = param('id').isMongoId().withMessage('Invalid id');

const bodyRules = [
  body('name').trim().notEmpty().withMessage('name is required'),
  body('price').isFloat({ min: 0 }).withMessage('price must be a number >= 0'),
  body('category').trim().notEmpty().withMessage('category is required'),
  body('availability').isBoolean().withMessage('availability must be boolean'),
];

/**
 * @openapi
 * /menu:
 *   get:
 *     tags: [Menu]
 *     summary: List all menu items
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', menuController.listMenu);

/**
 * @openapi
 * /menu/{id}:
 *   get:
 *     tags: [Menu]
 *     summary: Get menu item by id
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
router.get('/:id', idParam, validate, menuController.getMenuItem);

/**
 * @openapi
 * /menu:
 *   post:
 *     tags: [Menu]
 *     summary: Create menu item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuInput'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */
router.post('/', bodyRules, validate, menuController.createMenuItem);

/**
 * @openapi
 * /menu/{id}:
 *   put:
 *     tags: [Menu]
 *     summary: Update menu item
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
 *             $ref: '#/components/schemas/MenuInput'
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.put('/:id', idParam, bodyRules, validate, menuController.updateMenuItem);

/**
 * @openapi
 * /menu/{id}:
 *   delete:
 *     tags: [Menu]
 *     summary: Delete menu item
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
router.delete('/:id', idParam, validate, menuController.deleteMenuItem);

module.exports = router;
