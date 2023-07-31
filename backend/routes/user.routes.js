const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { body } = require('express-validator');

router.post('/signup', [
    body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
], userController.signup);

router.post('/login', [
    body('username').exists().withMessage('Username is required.'),
    body('password').exists().withMessage('Password is required.'),
], userController.login);

module.exports = router;
