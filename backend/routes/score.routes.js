const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/score.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { body } = require('express-validator');


router.post('/', [
    authMiddleware,
    body('score').isNumeric().withMessage('score should be numeric.'),
], scoreController.addScore);

router.get('/', authMiddleware, scoreController.getScores);

router.post('/best',[
    authMiddleware,
    body('mode').exists().withMessage('mode is required.'),
], scoreController.getBestScores); 


module.exports = router;
